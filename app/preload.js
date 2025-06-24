const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  guardarAsignatura: (filename, data) =>
    ipcRenderer.invoke("guardar-asignatura-json", filename, data),
    leerAsignaturasLocales: () =>
    ipcRenderer.invoke("leer-asignaturas-locales"),
});


console.log("✅ PRELOAD EJECUTADO");