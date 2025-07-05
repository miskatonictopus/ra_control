"use client"

import { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { state } from "@/lib/store"

import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconWithTooltipDialog } from "@/components/IconWithTooltipDialog"
import { Eye } from "lucide-react"
import { NuevoCurso } from "@/components/nuevo-curso"

export default function PaginaCursos() {
  const snap = useSnapshot(state)
  const cursos = snap.cursos
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const cargarCursos = async () => {
      try {
        const cursosLocales = await window.electronAPI.leerCursosLocales()

        type CursoDesdeJSON = {
          acronimo: string
          nombre: string
          nivel: string
          grado: string
        }

        const cursosValidos = (cursosLocales as any[]).filter(
          (c): c is CursoDesdeJSON =>
            typeof c.acronimo === "string" &&
            typeof c.nombre === "string" &&
            typeof c.nivel === "string" &&
            typeof c.grado === "string"
        )

        state.cursos = cursosValidos.map((c) => ({
          acronimo: c.acronimo,
          nombre: c.nombre,
          nivel: c.nivel,
          grado: c.grado,
        }))
      } catch (error) {
        console.error("❌ Error cargando cursos:", error)
        state.cursos = []
      }
    }

    cargarCursos()
  }, [])

  const handleCambiar = () => {
    console.log("Cambiar curso")
  }

  const handleConfirmar = async (datos: {
    acronimo: string
    nombre: string
    nivel: string
    grado: string
  }) => {
    setIsLoading(true)
    state.cursos.push(datos)
    await window.electronAPI.guardarCurso(datos)
    setIsLoading(false)
  }

  return (
    <div className="flex flex-col w-full h-full bg-zinc-950 text-white">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-6">Mis Cursos</h1>

        <div className="flex overflow-x-auto gap-6">
          {cursos.map((curso) => (
            <Card
              key={curso.acronimo}
              className="w-[375px] shrink-0 bg-zinc-900 border border-zinc-700"
            >
              <CardHeader className="pt-2 pb-0 h-[6.5rem]">
                <CardTitle className="text-white text-xl font-semibold leading-snug pt-4">
                  {curso.nombre}
                </CardTitle>
                <p className="text-xs text-white">{curso.acronimo} · {curso.grado} · Nivel {curso.nivel}</p>
              </CardHeader>

              <CardContent>
                <IconWithTooltipDialog
                  tooltip="Ver detalles del curso"
                  title={curso.nombre}
                  buttonVariant="outline"
                  buttonSize="sm"
                  buttonClassName="mt-4 border-zinc-600 text-zinc-950 hover:bg-zinc-800 hover:text-white"
                  content={
                    <div className="space-y-4 text-sm text-zinc-300 mt-4">
                      <p><span className="text-zinc-400 font-bold">Acrónimo:</span> {curso.acronimo}</p>
                      <p><span className="text-zinc-400 font-bold">Nombre:</span> {curso.nombre}</p>
                      <p><span className="text-zinc-400 font-bold">Nivel:</span> {curso.nivel}</p>
                      <p><span className="text-zinc-400 font-bold">Grado:</span> {curso.grado}</p>
                    </div>
                  }
                >
                  <Eye className="w-16 h-16 mr-1" />
                </IconWithTooltipDialog>
              </CardContent>
            </Card>
          ))}

          <NuevoCurso
            onCambiar={handleCambiar}
            onConfirmar={handleConfirmar}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  )
}