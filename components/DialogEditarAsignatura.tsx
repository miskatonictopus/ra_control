import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { state } from "@/lib/store"
import type { RA, CE } from "@/lib/store"

export function DialogEditarAsignatura({
  asignatura,
  open,
  onClose,
}: {
  asignatura: any
  open: boolean
  onClose: () => void
}) {
  const [raList, setRaList] = useState<RA[]>(asignatura.RA || [])

  const actualizarCampoRA = (index: number, descripcion: string) => {
    const nuevasRA = raList.map((ra, idx) =>
      idx === index ? { ...ra, descripcion } : ra
    )
    setRaList(nuevasRA)
  }

  const actualizarCampoCE = (raIndex: number, ceIndex: number, descripcion: string) => {
    const nuevasRA = raList.map((ra, idx) => {
      if (idx !== raIndex) return ra
      return {
        ...ra,
        CE: ra.CE.map((ce, cidx) =>
          cidx === ceIndex ? { ...ce, descripcion } : ce
        ),
      }
    })
    setRaList(nuevasRA)
  }

  const guardarCambios = async () => {
    const index = state.asignaturas.findIndex((a) => a.id === asignatura.id)
    if (index !== -1) {
      state.asignaturas[index].RA = raList
      const asignaturaLimpia = JSON.parse(JSON.stringify(state.asignaturas[index]))
      await window.electronAPI.guardarAsignatura(asignatura.filename, asignaturaLimpia)
      onClose() // Cierra el modal después de guardar
    }
  }

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar RA y CE de la asignatura {asignatura.nombre}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {raList.map((ra, raIdx) => (
            <div key={raIdx} className="border border-zinc-700 rounded-md p-4">
              <p className="text-zinc-400 font-semibold mb-1">RA{raIdx + 1}</p>
              <input
                className="w-full bg-zinc-800 text-white p-2 rounded-md mb-2"
                value={ra.descripcion}
                onChange={(e) => actualizarCampoRA(raIdx, e.target.value)}
              />
              <Separator className="my-2 bg-zinc-600" />
              <ul className="space-y-2">
                {ra.CE.map((ce, ceIdx) => (
                  <li key={ceIdx} className="flex items-center gap-2">
                    <span className="text-zinc-400 font-medium text-sm">
                      CE{" "}{raIdx + 1}.{ceIdx + 1}:
                    </span>
                    <input
                      className="flex-1 bg-zinc-900 text-white p-2 rounded-md"
                      value={ce.descripcion}
                      onChange={(e) => actualizarCampoCE(raIdx, ceIdx, e.target.value)}
                    />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <DialogFooter className="mt-6">
          <Button onClick={guardarCambios}>Guardar cambios</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}