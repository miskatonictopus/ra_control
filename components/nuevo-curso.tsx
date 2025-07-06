"use client"

import { useState } from "react"
import { PlusCircle, HelpCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { InputWithLabel } from "@/components/input-with-label"

import {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
} from "@/components/ui/hover-card"

// ✅ Tipos actualizados para alinearse con el modelo oficial de cursos
interface NuevoCursoProps {
  onCambiar?: () => void
  onConfirmar?: (datos: {
    acronimo: string
    nombre: string
    nivel: string
    grado: string
  }) => void
  isLoading?: boolean
}

export function NuevoCurso({
  onCambiar,
  onConfirmar,
  isLoading = false,
}: NuevoCursoProps) {
  const [acronimo, setAcronimo] = useState("")
  const [nombre, setNombre] = useState("")
  const [nivel, setNivel] = useState("")
  const [grado, setGrado] = useState("")

  const isFormValid =
    acronimo.trim() && nombre.trim() && nivel.trim() && grado.trim()

  const handleConfirmar = () => {
    if (onConfirmar) {
      onConfirmar({ acronimo, nombre, nivel, grado })
    }
  }

  return (
    <Card className="bg-zinc-900 border-zinc-700 relative w-[375px] shrink-0">
      <HoverCard>
        <HoverCardTrigger asChild>
          <button className="absolute top-2 right-2 text-white hover:text-emerald-400">
            <HelpCircle className="w-5 h-5" />
          </button>
        </HoverCardTrigger>
        <HoverCardContent className="w-80 text-sm leading-snug">
          <strong>¿Cómo crear un nuevo curso?</strong>
          <ul className="list-disc pl-4 mt-2">
            <li>Introduce el acrónimo del curso (Ej: DAMM, DAW, SMR2...)</li>
            <li>Escribe el nombre completo del ciclo.</li>
            <li>Indica el nivel (1 o 2) y el grado (medio o superior).</li>
          </ul>
        </HoverCardContent>
      </HoverCard>

      <CardHeader className="text-left">
        <CardTitle className="text-xl font-bold text-white flex">
          <PlusCircle className="w-6 h-6 text-white mr-2" /> Nuevo Curso
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Rellena los datos del nuevo curso
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-4">
        <InputWithLabel
          id="acronimo"
          label="Acrónimo del Curso"
          value={acronimo}
          onChange={setAcronimo}
          placeholder="Ej: DAMM"
          disabled={isLoading}
        />

        <InputWithLabel
          id="nombre"
          label="Nombre del Curso"
          value={nombre}
          onChange={setNombre}
          placeholder="Ej: Diseño de Aplicaciones Multiplataforma"
          disabled={isLoading}
        />

        <InputWithLabel
          id="nivel"
          label="Nivel"
          value={nivel}
          onChange={setNivel}
          placeholder="Ej: 2"
          disabled={isLoading}
        />

        <InputWithLabel
          id="grado"
          label="Grado"
          value={grado}
          onChange={setGrado}
          placeholder="Ej: superior"
          disabled={isLoading}
        />

        <div className="flex justify-between gap-4 mt-4">
          <Button
            onClick={onCambiar}
            variant="outline"
            size="sm"
            disabled={isLoading}
            className="flex-1 bg-transparent border-zinc-700 text-white hover:bg-zinc-800"
          >
            Cambiar
          </Button>

          <Button
            onClick={handleConfirmar}
            size="sm"
            disabled={!isFormValid || isLoading}
            className="flex-1 bg-white hover:bg-emerald-400 text-black"
          >
            {isLoading ? "Procesando..." : "Crear Curso"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
