"use client"

import { useState } from "react"
import { useMisCursos } from "@/hooks/useMisCursos"
import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputWithLabel } from "@/components/input-with-label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { HelpCircle } from "lucide-react";

interface NuevoAlumnoProps {
    onGuardado?: () => void
  }

  import {
    HoverCard,
    HoverCardTrigger,
    HoverCardContent,
  } from "@/components/ui/hover-card";

  export function NuevoAlumno({ onGuardado }: NuevoAlumnoProps) {

  const [apellido, setApellido] = useState("")
  const [nombre, setNombre] = useState("")
  const [curso, setCurso] = useState("")
  const [asignaturasSeleccionadas, setAsignaturasSeleccionadas] = useState<string[]>([])

  const cursos = useMisCursos()
  const asignaturas = useMisAsignaturas()

  const isFormValid = apellido && nombre && curso && asignaturasSeleccionadas.length > 0

  const toggleAsignatura = (codigo: string) => {
    setAsignaturasSeleccionadas((prev) =>
      prev.includes(codigo)
        ? prev.filter((c) => c !== codigo)
        : [...prev, codigo]
    )
  }

  const guardarAlumnoLocal = async () => {
    const alumno = { apellido, nombre, curso, asignaturas: asignaturasSeleccionadas }

    try {
      await window.electronAPI.guardarAlumno(alumno)
      alert("Alumno guardado de forma segura.")
      setApellido("")
      setNombre("")
      setCurso("")
      setAsignaturasSeleccionadas([])
    } catch (err) {
      console.error("❌ Error al guardar alumno:", err)
      alert("Error al guardar el alumno.")
    }
  }

  return (
    <div className="bg-zinc-950 flex items-start justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
    <Card className="bg-zinc-900 border-zinc-700 relative">
    <HoverCard>
            <HoverCardTrigger asChild>
              <button className="absolute top-2 right-2 text-white hover:text-emerald-400">
                <HelpCircle className="w-5 h-5" />
              </button>
            </HoverCardTrigger>
            <HoverCardContent className="w-80 text-sm leading-snug">
              <strong>¿Cómo añadir un nuevo Alumno?</strong>
              <ul className="list-disc pl-4 mt-2">
                <li>
                 Introduce el Apellido
                </li>
                <li>
                 Introuce el Nombre
                </li>
                <li>Selecciona el curso<br/><span className="text-rose-400">Ten en cuenta que tendrás que haber completado al menos con un curso el <strong>paso 2</strong> para poder asignar un curso al alumno y haber completado el <strong>paso 1</strong> con las asignaturas</span></li>
                <li>
                 Haz click sobre las asignaturas del alumno
                </li>
                <li>
                 Guarda a tu alumno!
                </li>
              </ul>
            </HoverCardContent>
          </HoverCard>
      <CardHeader className="text-left">
        <CardTitle className="text-xl font-bold text-white">3- Nuevo Alumno</CardTitle>
        <CardDescription className="text-zinc-400">
          Introduce los datos del alumno
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            id="apellido"
            label="Apellido"
            value={apellido}
            onChange={setApellido}
            placeholder="García"
          />
          <InputWithLabel
            id="nombre"
            label="Nombre"
            value={nombre}
            onChange={setNombre}
            placeholder="Laura"
          />
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Curso</label>
          <Select value={curso} onValueChange={setCurso}>
            <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
              <SelectValue placeholder="Selecciona curso" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-800 text-white border-zinc-700">
              {cursos.map((c) => (
                <SelectItem key={c.acronimo} value={c.acronimo}>
                  {c.acronimo} – {c.nombre}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="text-sm text-zinc-400 mb-1 block">Asignaturas</label>
          <div className="grid grid-cols-1 gap-2">
            {asignaturas.map((a) => (
              <label key={a.id} className="flex items-center space-x-2 text-white">
                <Checkbox
                  checked={asignaturasSeleccionadas.includes(a.id)}
                  onCheckedChange={() => toggleAsignatura(a.id)}
                />
                <span>{a.id} – {a.nombre}</span>
              </label>
            ))}
          </div>
        </div>

        <Button
          onClick={guardarAlumnoLocal}
          className="w-full bg-white hover:bg-emerald-400 text-black"
          disabled={!isFormValid}
        >
          Guardar alumno
        </Button>
      </CardContent>
    </Card>
    </div>
    </div>
  )
}
