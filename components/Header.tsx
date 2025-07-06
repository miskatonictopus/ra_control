"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Header() {
  return (
    <header className="w-full bg-zinc-950 border-b border-zinc-800 px-6 py-4 flex items-center justify-between shadow-sm">
      <h1 className="text-xl font-bold text-white">Control V‑1</h1>

      <nav className="flex items-center gap-6">
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
            <NavigationMenuTrigger className="bg-background text-foreground hover:bg-muted hover:text-foreground">Configuración</NavigationMenuTrigger>
              <NavigationMenuContent className="bg-background p-3 border border-border rounded-md shadow-md">
                <ul className="flex flex-col gap-2 w-[220px]">
                  <li>
                    <NavigationMenuLink asChild>
                    <Link href="/cursos" className="block space-y-1">
          <p className="text-sm font-medium leading-none">Cursos</p>
          <p className="text-sm text-muted-foreground">Añade tus nuevos cursos, modifica o borra.</p>
        </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                    <Link href="/asignaturas" className="block space-y-1">
          <p className="text-sm font-medium leading-none">Asignaturas</p>
          <p className="text-sm text-muted-foreground">Edita RA, CE y duración de cada asignatura.</p>
        </Link>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                    <Link href="/alumnos" className="block space-y-1">
          <p className="text-sm font-medium leading-none">Alumnos</p>
          <p className="text-sm text-muted-foreground">Añade, vincula y evalúa estudiantes.</p>
        </Link>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/actividades" className="text-white hover:underline px-4 py-2">
                  Actividades
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="text-white border-zinc-700">
              Opciones
            </Button>
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
