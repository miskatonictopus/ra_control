"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputWithLabel } from "@/components/input-with-label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Curso {
  acronimo: string
  nombre: string
  nivel: string
  grado: string
}

export function NuevoCurso() {
  const [acronimo, setAcronimo] = useState("")
  const [nombre, setNombre] = useState("")
  const [nivel, setNivel] = useState("")
  const [grado, setGrado] = useState("")

  const isFormValid = acronimo && nombre && nivel && grado

  const guardarCursoLocal = async () => {
    const nuevoCurso: Curso = { acronimo, nombre, nivel, grado }
    const filename = `${acronimo}-${nombre}.json`
  
    try {
      await window.electronAPI.guardarCurso(filename, nuevoCurso)
      alert("✅ Curso guardado correctamente")
  
      // Reset del formulario
      setAcronimo("")
      setNombre("")
      setNivel("")
      setGrado("")
    } catch (err) {
      console.error("❌ Error al guardar curso:", err)
      alert("❌ Error al guardar el curso")
    }
  }

  return (
    <div className="bg-zinc-950 flex items-start justify-center p-4">
      <div className="w-full max-w-2xl space-y-6">
    <Card className="bg-zinc-900 border-zinc-700">
      <CardHeader className="text-left">
        <CardTitle className="text-xl font-bold text-white">Nuevo Curso</CardTitle>
        <CardDescription className="text-zinc-400">
          Añade un nuevo curso a tu colección local
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <InputWithLabel
            id="acronimo"
            label="Acrónimo"
            value={acronimo}
            onChange={(v) => setAcronimo(v.toUpperCase())}
            placeholder="Ej: DAW"
          />
          <InputWithLabel
            id="nombre"
            label="Nombre completo"
            value={nombre}
            onChange={(v) => setNombre(v)}
            placeholder="Diseño de Aplicaciones Web"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Nivel</label>
            <Select value={nivel} onValueChange={setNivel}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Selecciona nivel" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-zinc-400 mb-1 block">Grado</label>
            <Select value={grado} onValueChange={setGrado}>
              <SelectTrigger className="bg-zinc-800 border-zinc-700 text-white">
                <SelectValue placeholder="Selecciona grado" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 text-white border-zinc-700">
                <SelectItem value="medio">Medio</SelectItem>
                <SelectItem value="superior">Superior</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          onClick={guardarCursoLocal}
          className="w-full bg-white hover:bg-emerald-400 text-black"
          disabled={!isFormValid}
        >
          Guardar curso localmente
        </Button>
      </CardContent>
    </Card>
    </div>
 </div>
  )
}
