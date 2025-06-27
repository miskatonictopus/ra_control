const fs = require("fs");
const path = require("path");
const crypto = require("crypto");
const { app, BrowserWindow, ipcMain } = require("electron");

// 📁 Carpeta persistente local dentro del proyecto
const dataDir = path.join(__dirname, "data");
const alumnosDir = path.join(dataDir, "alumnos");
const cursosDir = path.join(dataDir, "cursos");
const asignaturasDir = path.join(dataDir, "asignaturas");


// Crear estructura si no existe
fs.mkdirSync(alumnosDir, { recursive: true });
fs.mkdirSync(cursosDir, { recursive: true });
fs.mkdirSync(asignaturasDir, { recursive: true });

function createWindow() {
  const win = new BrowserWindow({
    width: 1000,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  win.loadURL("http://localhost:3000/dashboard/nueva-asignatura");
  win.webContents.openDevTools();
}

app.whenReady().then(createWindow);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

// UTILIDADES

function encryptAlumnoData(data, key) {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(JSON.stringify(data), "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    data: encrypted.toString("hex"),
  };
}

function decryptAlumnoData(payload, key) {
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");
  const encrypted = Buffer.from(payload.data, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);

  return JSON.parse(decrypted.toString("utf8"));
}

const alumnoKey = crypto.scryptSync("clave-secreta-super-segura", "salt-único", 32);

// 🧠 VALIDACIÓN
function leerJSONsEnDir(dirPath) {
  if (!fs.existsSync(dirPath)) return [];
  return fs
    .readdirSync(dirPath)
    .filter((f) => f.endsWith(".json"))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dirPath, file), "utf-8");
      return JSON.parse(raw);
    });
}

// =======================
// 📚 ASIGNATURAS
// =======================

ipcMain.handle("guardar-asignatura-json", async (event, filename, data) => {
  const filePath = path.join(asignaturasDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log("Asignatura guardada en:", filePath);
});

ipcMain.handle("leer-asignaturas-locales", async () => {
  return leerJSONsEnDir(asignaturasDir);
});

// =======================
// 🏫 CURSOS
// =======================

ipcMain.handle("guardar-curso-json", async (event, filename, data) => {
  const filePath = path.join(cursosDir, filename);
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log("✅ Curso guardado en:", filePath);
});

ipcMain.handle("leer-cursos-locales", async () => {
  return leerJSONsEnDir(cursosDir);
});

// =======================
// 🧑‍🎓 ALUMNOS (cifrados)
// =======================

ipcMain.handle("guardar-alumno", async (event, alumnoData) => {
  try {
    const cursos = leerJSONsEnDir(cursosDir);
    const asignaturas = leerJSONsEnDir(asignaturasDir);

    const cursoIds = cursos.map((c) => c.id);
    const asignaturaIds = asignaturas.map((a) => a.id);
    const errores = [];

    if (!cursoIds.includes(alumnoData.cursoId)) {
      errores.push(`Curso no válido: ${alumnoData.cursoId}`);
    }

    for (const aid of alumnoData.asignaturasIds || []) {
      if (!asignaturaIds.includes(aid)) {
        errores.push(`Asignatura no válida: ${aid}`);
      }
    }

    if (errores.length > 0) {
      console.warn("❌ Error de integridad:", errores);
      return { ok: false, errores };
    }

    const encrypted = encryptAlumnoData(alumnoData, alumnoKey);
    const filename = `${alumnoData.apellido}_${alumnoData.nombre}`.replace(/[^\w\s-]/gi, "_") + ".json";
    const filePath = path.join(alumnosDir, filename);

    fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), "utf-8");
    console.log("🧑‍🎓 Alumno guardado:", filePath);
    return { ok: true };

  } catch (error) {
    console.error("❌ Error al guardar alumno cifrado:", error);
    throw error;
  }
});

ipcMain.handle("leer-alumnos", async () => {
  try {
    const archivos = fs.readdirSync(alumnosDir).filter((f) => f.endsWith(".json"));
    return archivos.map((file) => {
      const payload = JSON.parse(fs.readFileSync(path.join(alumnosDir, file), "utf8"));
      return decryptAlumnoData(payload, alumnoKey);
    });
  } catch (err) {
    console.error("Error leyendo alumnos cifrados:", err);
    return [];
  }
});