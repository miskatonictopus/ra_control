"use client"

import { useState, useMemo } from "react"
import { useMisAlumnos } from "@/hooks/useMisAlumnos"
import { Checkbox } from "@/components/ui/checkbox"

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

  const [sortBy, setSortBy] = useState<"curso" | "apellido" | "nombre" | "asignaturas">("curso")
  const [direction, setDirection] = useState<"asc" | "desc">("asc")

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
        const valorA =
        Array.isArray(a[sortBy])
          ? (a[sortBy] as string[]).join(" ").toLowerCase()
          : a[sortBy]?.toString().toLowerCase() ?? ""
      
      const valorB =
        Array.isArray(b[sortBy])
          ? (b[sortBy] as string[]).join(" ").toLowerCase()
          : b[sortBy]?.toString().toLowerCase() ?? ""
  
      const resultado = valorA.localeCompare(valorB)
      return direction === "asc" ? resultado : -resultado
    })
  }, [alumnos, sortBy, direction])

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 w-full overflow-x-auto">
      <h2 className="text-white text-lg font-bold mb-4">Listado de Alumnos</h2>
      <table className="w-full table-auto text-sm text-white">
        <thead className="text-left border-b border-zinc-700">
          <tr>
            {columnas.map((col) => (
              <th
                key={col.id}
                onClick={() => toggleSort(col.id)}
                className="cursor-pointer px-2 py-1 hover:text-emerald-400"
              >
                {col.label} {sortBy === col.id && (direction === "asc" ? "▲" : "▼")}
              </th>
            ))}
            <th className="px-2 py-1">Editar</th>
            <th className="px-2 py-1">Borrar</th>
          </tr>
        </thead>
        <tbody>
          {alumnosOrdenados.map((alumno, i) => (
            <tr key={i} className="border-b border-zinc-800 hover:bg-zinc-800">
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
    </div>
  )
}
