"use client"

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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Asignaturas Registradas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {asignaturas.map((asig) => (
          <Card key={asig.id} className="bg-zinc-900 border-zinc-700">
            <CardHeader className="pt-2 pb-0 h-[6.5rem]">
              <CardTitle className="text-white text-xl font-semibold leading-snug pt-4">{asig.nombre}</CardTitle>
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
                        <span className="text-2xl font-bold text-white">{asig.RA.length}</span>
                      </div>
                      <div className="bg-zinc-900 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
                        <span className="block text-[10px] uppercase tracking-wider text-zinc-400">CE</span>
                        <span className="text-2xl font-bold text-white">
                          {asig.RA.reduce((total, ra) => total + (ra.CE?.length || 0), 0)}
                        </span>
                      </div>
                    </>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

        {/* Card para añadir nueva asignatura */}
        
            <NuevaAsignatura
              codigoParcial=""
              onCambiar={handleCambiar}
              onConfirmar={handleConfirmar}
              isLoading={isLoading}
            />
         
      </div>
    </div>
  )
}
