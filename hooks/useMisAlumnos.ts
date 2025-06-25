"use client"

import { useEffect, useState } from "react"

export interface Alumno {
  apellido: string
  nombre: string
  curso: string
  asignaturas: string[]
}

export function useMisAlumnos(): Alumno[] {
  const [alumnos, setAlumnos] = useState<Alumno[]>([])

  useEffect(() => {
    async function cargar() {
      try {
        const resultado = await window.electronAPI.leerAlumnos()
        console.log("📚 Alumnos desencriptados:", resultado)
        setAlumnos(resultado)
      } catch (error) {
        console.error("❌ Error al leer alumnos:", error)
      }
    }
    cargar()
  }, [])

  return alumnos
}
