// app/types/electron.d.ts
export {}

declare global {
  interface Window {
    electronAPI: ElectronAPI
  }

  interface ElectronAPI {
    guardarAsignatura: (filename: string, data: any) => Promise<void>
    leerAsignaturasLocales: () => Promise<any[]>

    guardarCurso: (data: {
      acronimo: string
      nombre: string
      nivel: string
      grado: string
    }) => Promise<void>

    leerCursosLocales: () => Promise<any[]>
    guardarAlumno: (data: any) => Promise<void>
    leerAlumnos: () => Promise<any[]>
  }
}