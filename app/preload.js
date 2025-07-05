const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electronAPI", {
  guardarAsignatura: (filename, data) =>
    ipcRenderer.invoke("guardar-asignatura-json", filename, data),

  leerAsignaturasLocales: () =>
    ipcRenderer.invoke("leer-asignaturas-locales"),

  guardarCurso: (data) => ipcRenderer.invoke("guardar-curso", data),

  leerCursosLocales: () => ipcRenderer.invoke("leer-cursos-locales"),

  guardarAlumno: (data) =>
    ipcRenderer.invoke("guardar-alumno", data),
    
  leerAlumnos: () => ipcRenderer.invoke("leer-alumnos")
})

console.log("✅ PRELOAD EJECUTADO");

