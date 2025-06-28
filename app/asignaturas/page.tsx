"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas"

export default function PaginaAsignaturas() {
  const asignaturas = useMisAsignaturas()
  console.log(asignaturas)

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Asignaturas Registradas</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {asignaturas.map((asig) => (
          <Card key={asig.id} className="bg-zinc-900 border-zinc-700">
          <div className="px-6 pt-4">
            <p className="text-xs text-zinc-400 font-mono">Código: {asig.id}</p>
          </div>
          <CardHeader className="pt-2 pb-0 h-[6.5rem]">
          <CardTitle className="text-white text-2xl font-semibold leading-snug">{asig.nombre}</CardTitle>
          </CardHeader>
          <CardContent>
          {(asig.descripcion || asig.RA) && (
  <div className="mt-4 flex flex-wrap gap-2">
    {/* HORAS */}
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-800 to zinc-50 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Totales:</span>
      <span className="text-4xl font-bold">{asig.descripcion?.duracion ?? "—"}</span>
    </div>
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-800 to zinc-50 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Centro:</span>
      <span className="text-4xl font-bold">{asig.descripcion?.centro ?? "—"}</span>
    </div>
    <div className="bg-gradient-to-b from-zinc-950 via-zinc-800 to zinc-50 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
      <span className="block text-[10px] uppercase tracking-wider text-zinc-400">Empresa:</span>
      <span className="text-4xl font-bold">{asig.descripcion?.empresa ?? "—"}</span>
    </div>

    {/* RA / CE / ? */}
    {asig.RA && (
      <>
        <div className="bg-gradient-to-b from-zinc-950 via-zinc-800 to zinc-50 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
          <span className="block text-[10px] uppercase tracking-wider text-zinc-400">RA</span>
          <span className="text-4xl font-bold text-emerald-300">{asig.RA.length}</span>
        </div>
        <div className="bg-gradient-to-b from-zinc-950 via-zinc-800 to zinc-50 text-white text-xs px-3 py-2 rounded-lg border border-zinc-700 shadow-sm">
          <span className="block text-[10px] uppercase tracking-wider text-zinc-400">CE</span>
          <span className="text-4xl font-bold text-emerald-300">
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
      </div>
    </div>
  )
}
