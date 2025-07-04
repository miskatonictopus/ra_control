// components/DialogEditarAsignaturaFlow.tsx
"use client"

import { useState } from "react"
import { DialogAdvertencia, DialogConfirmacionTexto } from "@/components/DialogAdvertencia"
import { DialogEditarAsignatura } from "@/components/DialogEditarAsignatura"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { SquarePen } from "lucide-react"

export function DialogEditarAsignaturaFlow({ asignatura }: { asignatura: any }) {
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)
  const [mostrarEditor, setMostrarEditor] = useState(false)

  const iniciarFlujo = () => setMostrarAdvertencia(true)

  const cerrarTodo = () => {
    setMostrarAdvertencia(false)
    setMostrarConfirmacion(false)
    setMostrarEditor(false)
  }

  return (
    <>
      {/* Icono con tooltip que inicia el flujo */}
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="mt-4 ml-2 border-zinc-600 text-zinc-950 hover:bg-zinc-800 hover:text-white"
            onClick={iniciarFlujo}
          >
            <SquarePen className="w-6 h-6" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Editar asignatura</p>
        </TooltipContent>
      </Tooltip>

      {/* Paso 1: Advertencia */}
      <DialogAdvertencia
        open={mostrarAdvertencia}
        titulo="Modificar RA y CE"
        descripcion="Estás a punto de modificar los Resultados de Aprendizaje (RA) y los Criterios de Evaluación (CE). Esta acción puede afectar a datos futuros como notas, combinaciones y resultados. Asegúrate de saber lo que haces."
        onCancelar={cerrarTodo}
        onAceptar={() => {
          setMostrarAdvertencia(false)
          setMostrarConfirmacion(true)
        }}
      />

      {/* Paso 2: Confirmación por texto */}
      <DialogConfirmacionTexto
        open={mostrarConfirmacion}
        palabraClave="EDITAR"
        onCancelar={cerrarTodo}
        onConfirmar={() => {
          setMostrarConfirmacion(false)
          setMostrarEditor(true)
        }}
      />

      {/* Paso 3: Editor de RA y CE */}
      {mostrarEditor && (
        <DialogEditarAsignatura
          asignatura={asignatura}
          open={mostrarEditor}
          onClose={cerrarTodo}
        />
      )}
    </>
  )
}
