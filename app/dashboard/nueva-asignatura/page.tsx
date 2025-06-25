"use client"

import { useState } from "react"
import { NuevaAsignatura } from "@/components/nueva-asignatura"
import { NuevoCurso } from "@/components/NuevoCurso"
import { NuevoAlumno } from "@/components/NuevoAlumno"
import { TablaAlumnos } from "@/components/TablaAlumnos"

export default function NuevaAsignaturaPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleCambiar = () => {
    console.log("Cambiar clicked")
  }

  const handleConfirmar = async (datos: {
    codigo: string
    nombre: string
    creditos: string
    descripcion: string
  }) => {
    setIsLoading(true)
    console.log("Datos confirmados:", datos)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col lg:flex-row gap-6 w-full">
      {/* Columna izquierda: ancho máximo fijo */}
      <div className="w-full lg:w-[420px] flex-shrink-0 flex flex-col gap-6">
        <NuevaAsignatura
          codigoParcial=""
          onCambiar={handleCambiar}
          onConfirmar={handleConfirmar}
          isLoading={isLoading}
        />
        <NuevoCurso />
        <NuevoAlumno onGuardado={() => console.log("Alumno guardado ✅")} />
      </div>

      {/* Columna derecha: ocupa el espacio restante */}
      <div className="flex-1 overflow-x-auto">
        <TablaAlumnos />
      </div>
    </div>
  )
}
