// components/DialogBorrarCursoFlow.tsx
"use client"

import { useState } from "react"
import { DialogAdvertencia, DialogConfirmacionTexto } from "@/components/DialogAdvertencia"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import { toast } from "sonner"
import { state } from "@/lib/store"

export function DialogBorrarCursoFlow({
  curso
}: {
  curso: { id: string; acronimo: string }
}) {
  const [mostrarAdvertencia, setMostrarAdvertencia] = useState(false)
  const [mostrarConfirmacion, setMostrarConfirmacion] = useState(false)

  const iniciarFlujo = () => setMostrarAdvertencia(true)
  const cerrarTodo = () => {
    setMostrarAdvertencia(false)
    setMostrarConfirmacion(false)
  }

  const handleBorradoFinal = async () => {
    try {
      await window.electronAPI.borrarCurso(curso.id)
      toast.success(`Curso "${curso.acronimo}" borrado correctamente`)

      // ❌ Eliminar del estado reactivo
      state.cursos = state.cursos.filter((c) => c.id !== curso.id)
    } catch (error) {
      toast.error("Error al borrar el curso")
      console.error(error)
    } finally {
      cerrarTodo()
    }
  }

  return (
    <>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="text-zinc-400 hover:text-emerald-400 transition-colors"
            onClick={iniciarFlujo}
          >
            <Trash2 className="w-5 h-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">Borrar curso</p>
        </TooltipContent>
      </Tooltip>

      {/* Paso 1: Advertencia */}
      <DialogAdvertencia
        open={mostrarAdvertencia}
        titulo={`Borrar curso: ${curso.id}`}
        descripcion="Estás a punto de eliminar este curso permanentemente de la base de datos. Esta acción es irreversible. ¿Deseas continuar?"
        onCancelar={cerrarTodo}
        onAceptar={() => {
          setMostrarAdvertencia(false)
          setMostrarConfirmacion(true)
        }}
      />

      {/* Paso 2: Confirmación por palabra clave */}
      <DialogConfirmacionTexto
        open={mostrarConfirmacion}
        palabraClave="BORRAR"
        onCancelar={cerrarTodo}
        onConfirmar={handleBorradoFinal}
      />
    </>
  )
}
