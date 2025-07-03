// lib/store.ts
import { proxy } from 'valtio'

// Tipos de datos
export type CE = { codigo: string; descripcion: string }
export type RA = { codigo: string; descripcion: string; CE: CE[] }
export type Descripcion = { duracion: string; centro: string; empresa: string }

export type Asignatura = {
  id: string
  nombre: string
  descripcion?: Descripcion
  RA?: RA[]
  filename?: string
}

// Estado global reactivo
export const state = proxy({
  asignaturas: [] as Asignatura[],
})
