"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"


export function Header() {
  return (
    <header className="w-full bg-zinc-900 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-bold text-white">Control V-1</h1>

      <nav className="flex items-center gap-4">
        <Button variant="ghost" className="text-white hover:bg-zinc-800">
        <Link href="/cursos">Cursos</Link>
        </Button>
        <Button variant="ghost" className="text-white hover:bg-zinc-800">
        <Link href="/asignaturas">Asignaturas</Link>
        </Button>
        <Button variant="ghost" className="text-white hover:bg-zinc-800">Alumnos</Button>
        <Button variant="ghost" className="text-white hover:bg-zinc-800">Actividades</Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-white border-zinc-700">Opciones</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-zinc-900 border-zinc-700 text-white">
            <DropdownMenuItem>Perfil</DropdownMenuItem>
            <DropdownMenuItem>Configuración</DropdownMenuItem>
            <DropdownMenuItem>Cerrar sesión</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </header>
  )
}
