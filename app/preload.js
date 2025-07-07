const { contextBridge, ipcRenderer } = require("electron")

contextBridge.exposeInMainWorld("electronAPI", {
  guardarAsignatura: (filename, data) =>
    ipcRenderer.invoke("guardar-asignatura-json", filename, data),

  leerAsignaturasLocales: () =>
    ipcRenderer.invoke("leer-asignaturas-locales"),

  guardarCurso: (curso) =>
    ipcRenderer.invoke("guardar-curso", curso),

  leerCursos: () =>
    ipcRenderer.invoke("leer-cursos"), 

  borrarCurso: (id) => ipcRenderer.invoke("borrar-curso", id),

  guardarAlumno: (data) =>
    ipcRenderer.invoke("guardar-alumno", data),

  leerAlumnos: () =>
    ipcRenderer.invoke("leer-alumnos"),
})
