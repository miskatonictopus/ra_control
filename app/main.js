const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");
const crypto = require("crypto");


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
  win.webContents.openDevTools(); // Opcional para depuración
}

app.whenReady().then(createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

ipcMain.handle("guardar-asignatura-json", async (event, filename, data) => {
  const saveDir = path.join(app.getPath("userData"), "asignaturas");
  const filePath = path.join(saveDir, filename);

  fs.mkdirSync(saveDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log("✅ Archivo guardado en:", filePath); // <- Aquí sí está bien
});

ipcMain.handle("leer-asignaturas-locales", async () => {
  const dir = path.join(app.getPath("userData"), "asignaturas");
  try {
    const files = fs.readdirSync(dir);
    const asignaturas = files
      .filter((f) => f.endsWith(".json"))
      .map((file) => {
        const content = fs.readFileSync(path.join(dir, file), "utf-8");
        return JSON.parse(content);
      });
    return asignaturas;
  } catch (err) {
    console.error("Error leyendo asignaturas:", err);
    return [];
  }
});

ipcMain.handle("guardar-curso-json", async (event, filename, data) => {
  const saveDir = path.join(app.getPath("userData"), "cursos");
  const filePath = path.join(saveDir, filename);
  fs.mkdirSync(saveDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
  console.log("✅ Curso guardado en:", filePath);
});

ipcMain.handle("leer-cursos-locales", async () => {
  const dir = path.join(app.getPath("userData"), "cursos");
  try {
    const files = fs.readdirSync(dir);
    const cursos = files
      .filter((f) => f.endsWith(".json"))
      .map((file) => {
        const content = fs.readFileSync(path.join(dir, file), "utf-8");
        return JSON.parse(content);
      });
    return cursos;
  } catch (err) {
    console.error("Error leyendo cursos:", err);
    return [];
  }
});

function encryptAlumnoData(data, key) {
  const iv = crypto.randomBytes(12); // CIFRADO AES-256
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);

  const encrypted = Buffer.concat([
    cipher.update(JSON.stringify(data), "utf8"),
    cipher.final()
  ]);

  const tag = cipher.getAuthTag();

  return {
    iv: iv.toString("hex"),
    tag: tag.toString("hex"),
    data: encrypted.toString("hex"),
  };
}

const alumnoKey = crypto.scryptSync("clave-secreta-super-segura", "salt-único", 32);


ipcMain.handle("guardar-alumno", async (event, alumnoData) => {
  try {
    const encrypted = encryptAlumnoData(alumnoData, alumnoKey);

    const saveDir = path.join(app.getPath("userData"), "alumnos");
    fs.mkdirSync(saveDir, { recursive: true });

    const filename = `${alumnoData.apellido}_${alumnoData.nombre}`.replace(/[^\w\s-]/gi, "_") + ".json";

    const filePath = path.join(saveDir, filename);

    fs.writeFileSync(filePath, JSON.stringify(encrypted, null, 2), "utf-8");

    console.log("🧑‍🎓 Alumno guardado:", filePath);
  } catch (error) {
    console.error("❌ Error al guardar alumno cifrado:", error);
    throw error;
  }
});

function decryptAlumnoData(payload, key) {
  const iv = Buffer.from(payload.iv, "hex");
  const tag = Buffer.from(payload.tag, "hex");
  const encrypted = Buffer.from(payload.data, "hex");

  const decipher = crypto.createDecipheriv("aes-256-gcm", key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([
    decipher.update(encrypted),
    decipher.final()
  ]);

  return JSON.parse(decrypted.toString("utf8"));
}

ipcMain.handle("leer-alumnos", async () => {
  const dir = path.join(app.getPath("userData"), "alumnos");
  try {
    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));
    return files.map((file) => {
      const payload = JSON.parse(fs.readFileSync(path.join(dir, file), "utf8"));
      return decryptAlumnoData(payload, alumnoKey);
    });
  } catch (err) {
    console.error("Error leyendo alumnos cifrados:", err);
    return [];
  }
});






