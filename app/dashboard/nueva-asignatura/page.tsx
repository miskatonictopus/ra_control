"use client"

import { useState } from "react"
import { NuevaAsignatura } from "@/components/nueva-asignatura"



export default function NuevaAsignaturaPage() {
  const [isLoading, setIsLoading] = useState(false)

  const handleCambiar = () => {
    console.log("Cambiar clicked")
    // Lógica para cambiar/resetear formulario
  }

  const handleConfirmar = async (datos: {
    codigo: string
    nombre: string
    creditos: string
    descripcion: string
  }) => {
    setIsLoading(true)
    console.log("Datos confirmados:", datos)

    // Simular llamada API
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    // Lógica para guardar la asignatura
  }

  return (
    <NuevaAsignatura
      codigoParcial=""
      // coincidencias={coincidenciasEjemplo}
      onCambiar={handleCambiar}
      onConfirmar={handleConfirmar}
      isLoading={isLoading}
    />
  )
}
