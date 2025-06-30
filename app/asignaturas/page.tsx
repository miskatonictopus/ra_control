"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

import { Header } from "@/components/Header"

import { useState } from "react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas"
import { NuevaAsignatura } from "@/components/nueva-asignatura"

export default function PaginaAsignaturas() {
  const asignaturas = useMisAsignaturas()
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
    <div className="flex flex-col w-full h-full bg-zinc-950 text-white">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Mis Asignaturas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {asignaturas.map((asig) => (
            <Card key={asig.id} className="bg-zinc-900 border-zinc-700">
              <CardHeader className="pt-2 pb-0 h-[6.5rem]">
                <CardTitle className="text-white text-xl font-semibold leading-snug pt-4">
                  {asig.nombre}
                </CardTitle>
                <p className="text-xs text-white">Código: {asig.id}</p>
              </CardHeader>

              <CardContent>
                {(asig.descripcion || asig.RA) && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">H Totales:</span>
                      <span className="text-2xl font-bold">{asig.descripcion?.duracion ?? "—"}</span>
                    </div>
                    <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">H Centro:</span>
                      <span className="text-2xl font-bold">{asig.descripcion?.centro ?? "—"}</span>
                    </div>
                    <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">H Empresa:</span>
                      <span className="text-2xl font-bold">{asig.descripcion?.empresa ?? "—"}</span>
                    </div>

                    {asig.RA && (
                      <>
                        <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider text-zinc-400">RA</span>
                          <span className="text-2xl font-bold">{asig.RA.length}</span>
                        </div>
                        <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                          <span className="block text-[10px] uppercase tracking-wider text-zinc-400">CE</span>
                          <span className="text-2xl font-bold">
                            {asig.RA.reduce((total, ra) => total + (ra.CE?.length || 0), 0)}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* Botón con modal */}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-4 border-zinc-600 text-zinc-950 hover:bg-zinc-800 hover:text-white"
                    >
                      <Eye className="w-16 h-16 mr-1" />
                
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
  <DialogHeader>
    <DialogTitle>{asig.nombre}</DialogTitle>
  </DialogHeader>

  <div className="mt-4 space-y-6 text-sm">
    <table className="w-full border-collapse">
      <tbody>
        <tr>
          <td className="p-2 border-b border-zinc-700 text-zinc-400">Código</td>
          <td className="p-2 border-b border-zinc-700">{asig.id}</td>
        </tr>
        <tr>
          <td className="p-2 border-b border-zinc-700 text-zinc-400">Horas Totales</td>
          <td className="p-2 border-b border-zinc-700">{asig.descripcion?.duracion ?? "—"}</td>
        </tr>
        <tr>
          <td className="p-2 border-b border-zinc-700 text-zinc-400">Centro</td>
          <td className="p-2 border-b border-zinc-700">{asig.descripcion?.centro ?? "—"}</td>
        </tr>
        <tr>
          <td className="p-2 border-b border-zinc-700 text-zinc-400">Empresa</td>
          <td className="p-2 border-b border-zinc-700">{asig.descripcion?.empresa ?? "—"}</td>
        </tr>
        <tr>
          <td className="p-2 border-b border-zinc-700 text-zinc-400">RA</td>
          <td className="p-2 border-b border-zinc-700">{asig.RA?.length ?? 0}</td>
        </tr>
        <tr>
          <td className="p-2 text-zinc-400">CE Totales</td>
          <td className="p-2">
            {asig.RA?.reduce((total, ra) => total + (ra.CE?.length || 0), 0)}
          </td>
        </tr>
      </tbody>
    </table>

    {asig.RA && (
      <div>
        <h3 className="text-base font-semibold text-white mb-2">Resultados de Aprendizaje (RA)</h3>
        <div className="space-y-4">
          {asig.RA.map((ra, index) => (
            <div key={index} className="border border-zinc-700 rounded-md p-4">
              <p className="text-white font-medium mb-2">
                <span className="text-zinc-400 mr-1">RA{index + 1}:</span>
                {ra.descripcion}
              </p>
              {ra.CE && ra.CE.length > 0 && (
                <ul className="list-disc list-inside space-y-1 text-sm text-zinc-300">
                  {ra.CE.map((ce, idx) => (
                    <li key={idx}>
                      <span className="text-zinc-400 font-medium mr-1">CE{index + 1}.{idx + 1}:</span>
                      {ce.descripcion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
</DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          ))}

          <NuevaAsignatura
            codigoParcial=""
            onCambiar={handleCambiar}
            onConfirmar={handleConfirmar}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}
