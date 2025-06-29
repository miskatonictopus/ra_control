"use client"

import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select"

import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas"

export function SelectAsignatura() {
  const asignaturas = useMisAsignaturas()

  return (
    <Select onValueChange={(value) => console.log("Asignatura seleccionada:", value)}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="seleccionar" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {asignaturas.map((asig) => (
            <SelectItem className="pl-2 pr-3 py-2 text-sm" key={asig.id} value={asig.id}>
              <span className="font-bold">{asig.id}</span> - {asig.nombre}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}