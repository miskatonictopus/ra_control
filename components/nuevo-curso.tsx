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

interface NuevoCursoProps {
  onCambiar?: () => void
  onConfirmar?: (datos: {
    nombre: string
    anyo: string
    descripcion: string
  }) => void
  isLoading?: boolean
}

export function NuevoCurso({
  onCambiar,
  onConfirmar,
  isLoading = false,
}: NuevoCursoProps) {
  const [nombre, setNombre] = useState("")
  const [anyo, setAnyo] = useState("")
  const [descripcion, setDescripcion] = useState("")

  const isFormValid = nombre.trim() && anyo.trim()

  const handleConfirmar = () => {
    if (onConfirmar) {
      onConfirmar({ nombre, anyo, descripcion })
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
            <li>Introduce el nombre del curso (Ej: DAW1).</li>
            <li>Indica el año (Ej: 2025-26).</li>
            <li>Puedes añadir una breve descripción.</li>
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
          id="nombre"
          label="Nombre del Curso"
          value={nombre}
          onChange={setNombre}
          placeholder="Ej: DAW1, ASIR2..."
          disabled={isLoading}
        />

        <InputWithLabel
          id="anyo"
          label="Año Académico"
          value={anyo}
          onChange={setAnyo}
          placeholder="Ej: 2025-26"
          disabled={isLoading}
        />

        <InputWithLabel
          id="descripcion"
          label="Descripción"
          value={descripcion}
          onChange={setDescripcion}
          placeholder="Grupo A tarde / modalidad online"
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
