const fs = require("fs");
const { app, BrowserWindow, ipcMain } = require("electron");
const path = require("path");


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
  const saveDir = path.join(app.getPath("documents"), "Auswertecontroller");
  const filePath = path.join(saveDir, filename);

  fs.mkdirSync(saveDir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");

  console.log("✅ Archivo guardado en:", filePath); // <- Aquí sí está bien
});

ipcMain.handle("leer-asignaturas-locales", async () => {
  const dir = path.join(app.getPath("documents"), "Auswertecontroller");
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



