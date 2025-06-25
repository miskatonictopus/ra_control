export {}

declare global {
  interface Window {
    electronAPI: ElectronAPI;
  }

  interface ElectronAPI {
    guardarAsignatura: (filename: string, data: any) => Promise<void>
    leerAsignaturasLocales: () => Promise<Asignatura[]>
    guardarCurso: (filename: string, data: any) => Promise<void>
    leerCursosLocales: () => Promise<Curso[]>
    guardarAlumno: (data: Alumno) => Promise<void>
    leerAlumnos: () => Promise<Alumno[]>
  }

  interface Asignatura {
    codigo: string
    nombre: string
    creditos?: number
  }

  interface Curso {
    acronimo: string
    nombre: string
    nivel: string
    grado: string
  }

  interface Alumno {
    apellido: string;
    nombre: string;
    curso: string;             
    asignaturas: string[];      
  }
}

