export {}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }

  interface ElectronAPI {
    guardarAsignatura: (filename: string, data: any) => Promise<void>
    leerAsignaturasLocales: () => Promise<any[]>

    guardarCurso: (curso: {
      acronimo: string
      nombre: string
      nivel: string
      grado: string
    }) => Promise<boolean>

    leerCursos: () => Promise<any[]>   // 👈 esto debe coincidir con preload.js

    guardarAlumno: (data: any) => Promise<void>
    leerAlumnos: () => Promise<any[]>
  }
}