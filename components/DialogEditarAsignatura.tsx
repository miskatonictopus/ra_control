// Este componente reemplaza IconWithTooltip para editar RA y CE de una asignatura
import { useState } from "react"
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SquarePen } from "lucide-react"
import { state } from "@/lib/store"
import type { RA, CE } from "@/lib/store"

export function DialogEditarAsignatura({ asignatura }: { asignatura: any }) {
  const [raList, setRaList] = useState(asignatura.RA || [])

const actualizarCampoRA = (index: number, descripcion: string) => {
  const nuevasRA = raList.map((ra: RA, idx: number) => {
    return idx === index ? { ...ra, descripcion } : ra
  })
  setRaList(nuevasRA)
}

const actualizarCampoCE = (raIndex: number, ceIndex: number, descripcion: string) => {
  const nuevasRA = raList.map((ra: RA, idx: number) => {
    if (idx !== raIndex) return ra
    return {
      ...ra,
      CE: ra.CE.map((ce: CE, cidx: number) => {
        return cidx === ceIndex ? { ...ce, descripcion } : ce
      })
    }
  })
  setRaList(nuevasRA)
}


  const guardarCambios = async () => {
  const index = state.asignaturas.findIndex((a) => a.id === asignatura.id)
  if (index !== -1) {
    state.asignaturas[index].RA = raList

   const asignaturaLimpia = JSON.parse(JSON.stringify(state.asignaturas[index]))

    await window.electronAPI.guardarAsignatura(
      asignatura.filename,
      asignaturaLimpia
    )
  }
}

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 ml-2 border-zinc-600 text-zinc-950 hover:bg-zinc-800 hover:text-white"
        >
          <SquarePen className="w-6 h-6" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto text-white">
        <DialogHeader>
          <DialogTitle>Editar RA y CE de {asignatura.nombre}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 text-sm">
          {raList.map((ra: any, raIdx: number) => (
            <div key={raIdx} className="border border-zinc-700 rounded-md p-4">
              <input
                className="w-full bg-zinc-800 text-white p-2 rounded-md mb-2"
                value={ra.descripcion}
                onChange={(e) => actualizarCampoRA(raIdx, e.target.value)}
              />
              <Separator className="my-2 bg-zinc-600" />
              <ul className="space-y-2">
                {ra.CE.map((ce: any, ceIdx: number) => (
                  <li key={ceIdx}>
                    <input
                      className="w-full bg-zinc-900 text-white p-2 rounded-md"
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
