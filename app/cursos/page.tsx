"use client"

import { useEffect, useState } from "react"
import { useSnapshot } from "valtio"
import { state } from "@/lib/store"

import { Header } from "@/components/Header"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconWithTooltipDialog } from "@/components/IconWithTooltipDialog"
import { Eye, PlusCircle } from "lucide-react"
import { NuevoCurso } from "@/components/nuevo-curso"
import { toast } from "sonner"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

export default function PaginaCursos() {
  const snap = useSnapshot(state)
  const cursos = snap.cursos
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false)

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
    if (!datos.acronimo) {
      toast.error("El acrónimo no puede estar vacío")
      return
    }
  
    const filename = `${datos.acronimo}.json`
    console.log("handleConfirmar - datos:", datos)
    console.log("handleConfirmar - filename:", filename)
    try {
      setIsLoading(true)
      state.cursos.push(datos)
      await window.electronAPI.guardarCurso(filename, datos)
      toast.success("Curso creado correctamente")
      setOpen(false)
    } catch (error) {
      toast.error("Error al guardar el curso")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }
  
  

  return (
    <div className="flex flex-col w-full h-full bg-zinc-950 text-white">
      <Header />
      <main className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">Mis Cursos</h1>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <div className="flex items-center bg-zinc-950 px-4 py-2 rounded-lg cursor-pointer hover:bg-zinc-900 transition border border-zinc-700 shadow-md">
                <PlusCircle className="w-6 h-6 text-white mr-2" />
                <span className="text-white text-sm font-semibold">Nuevo Curso</span>
              </div>
            </DialogTrigger>
            <DialogContent className="bg-zinc-950 border border-zinc-700 text-white max-w-lg">
              <DialogHeader>
                <DialogTitle>Crear nuevo curso</DialogTitle>
              </DialogHeader>
              <NuevoCurso
                onCambiar={handleCambiar}
                onConfirmar={handleConfirmar}
                isLoading={isLoading}
              />
            </DialogContent>
          </Dialog>
        </div>

        <div className="flex overflow-x-auto gap-6">
          {cursos.map((curso) => (
            <Card
              key={curso.acronimo}
              className="w-[375px] shrink-0 bg-zinc-900 border border-zinc-700"
            >
              <CardHeader className="pt-2 pb-0">
                <p className="text-3xl text-white font-semibold leading-snug pt-1">{curso.acronimo}</p>
                <CardTitle className="text-white text-xl font-semibold leading-snug pt-1">
                  {curso.nombre}
                </CardTitle>
                <p className="text-xs text-zinc-400">GRADO {curso.grado} · Nivel {curso.nivel}</p>
              </CardHeader>
            </Card>
          ))}
        </div>
      </main>
    </div>
  )
}
