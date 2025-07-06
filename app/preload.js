const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  guardarAsignatura: (filename, data) =>
    ipcRenderer.invoke("guardar-asignatura-json", filename, data),

  leerAsignaturasLocales: () =>
    ipcRenderer.invoke("leer-asignaturas-locales"),

  guardarCurso: (curso) =>
    ipcRenderer.invoke("guardar-curso", curso),

  leerCursos: () =>
    ipcRenderer.invoke("leer-cursos"), // 👈 que coincida con el tipo
  guardarAlumno: (data) =>
    ipcRenderer.invoke("guardar-alumno", data),

  leerAlumnos: () =>
    ipcRenderer.invoke("leer-alumnos"),
})
