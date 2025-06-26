"use client"

import { useState, useMemo } from "react"
import { useMisAlumnos } from "@/hooks/useMisAlumnos"
import { Checkbox } from "@/components/ui/checkbox"
import {
  CardDescription,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/components/ui/card"
import { Pencil, Trash2 } from "lucide-react"

interface Alumno {
  apellido: string
  nombre: string
  curso: string
  asignaturas: string[]
}

const columnas: { id: keyof Alumno; label: string }[] = [
  { id: "curso", label: "Curso" },
  { id: "asignaturas", label: "Asignatura" },
  { id: "apellido", label: "Apellido" },
  { id: "nombre", label: "Nombre" },
]

export function TablaAlumnos() {
  const alumnos = useMisAlumnos()

  const [sortBy, setSortBy] = useState<keyof Alumno>("curso")
  const [direction, setDirection] = useState<"asc" | "desc">("asc")

  const [selectedAlumnos, setSelectedAlumnos] = useState<number[]>([])

  const toggleSort = (campo: keyof Alumno) => {
    if (sortBy === campo) {
      setDirection(direction === "asc" ? "desc" : "asc")
    } else {
      setSortBy(campo)
      setDirection("asc")
    }
  }

  const alumnosOrdenados = useMemo(() => {
    return [...alumnos].sort((a, b) => {
      const valorA = Array.isArray(a[sortBy])
        ? (a[sortBy] as string[]).join(" ").toLowerCase()
        : a[sortBy]?.toString().toLowerCase() ?? ""

      const valorB = Array.isArray(b[sortBy])
        ? (b[sortBy] as string[]).join(" ").toLowerCase()
        : b[sortBy]?.toString().toLowerCase() ?? ""

      const resultado = valorA.localeCompare(valorB)
      return direction === "asc" ? resultado : -resultado
    })
  }, [alumnos, sortBy, direction])

  const allSelected = selectedAlumnos.length === alumnos.length

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked
    if (checked) {
      setSelectedAlumnos(alumnosOrdenados.map((_, i) => i))
    } else {
      setSelectedAlumnos([])
    }
  }

  const toggleAlumno = (index: number) => {
    if (selectedAlumnos.includes(index)) {
      setSelectedAlumnos(selectedAlumnos.filter((i) => i !== index))
    } else {
      setSelectedAlumnos([...selectedAlumnos, index])
    }
  }

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl w-full overflow-x-auto justify-center">
      <CardHeader className="text-left">
        <CardTitle className="text-xl font-bold text-white">Listados de Alumnos</CardTitle>
        <CardDescription className="text-zinc-400">
          Introduce el código de tu nueva asignatura y selecciónala
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <table className="w-full table-auto text-sm text-white">
          <thead className="text-left border-b border-zinc-700">
            <tr>
              <th className="px-2 py-1">
                <label className="flex items-center gap-2 cursor-pointer text-sm font-medium text-muted-foreground">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    onChange={handleSelectAll}
                    checked={allSelected}
                  />
                  <span className="text-xs">Select all</span>
                </label>
              </th>
              {columnas.map((col) => (
                <th
                  key={col.id}
                  onClick={() => toggleSort(col.id)}
                  className="cursor-pointer px-2 py-1 hover:text-emerald-400"
                >
                  {col.label} {sortBy === col.id && (direction === "asc" ? "▲" : "▼")}
                </th>
              ))}
              <th className="px-2 py-1">
                <Pencil className="w-4 h-4 text-muted-foreground hover:text-emerald-400 cursor-pointer" />
              </th>
              <th className="px-2 py-1">
                <Trash2 className="w-4 h-4 text-muted-foreground hover:text-emerald-400 cursor-pointer" />
              </th>
            </tr>
          </thead>
          <tbody>
            {alumnosOrdenados.map((alumno, i) => (
              <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800">
                <td className="px-2 py-2">
                  <input
                    type="checkbox"
                    className="accent-primary"
                    checked={selectedAlumnos.includes(i)}
                    onChange={() => toggleAlumno(i)}
                  />
                </td>
                <td className="px-2 py-2">{alumno.curso}</td>
                <td className="px-2 py-2">{alumno.asignaturas.join(", ")}</td>
                <td className="px-2 py-2">{alumno.apellido}</td>
                <td className="px-2 py-2">{alumno.nombre}</td>
                <td className="px-2 py-2">
                  <Checkbox className="border-zinc-600" />
                </td>
                <td className="px-2 py-2">
                  <Checkbox className="border-zinc-600" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </div>
  )
}
