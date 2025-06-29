"use client"

import * as React from "react"
import { useMisCursos } from "@/hooks/useMisCursos"
import { useMisAsignaturas } from "@/hooks/use-mis-asignaturas"
import {
  BookUser,
  BarChartIcon,
  ClipboardListIcon,
  DatabaseIcon,
  FileIcon,
  FolderIcon,
  HelpCircleIcon,
  GraduationCap,
  UsersRound,
  SearchIcon,
  SettingsIcon,
  UsersIcon,
  Eye,
} from "lucide-react"

import { NavDocuments } from "@/components/nav-documents"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"


const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    { title: "Asignaturas", url: "/asignaturas", icon: BookUser },
    { title: "Cursos", url: "#", icon: GraduationCap },
    { title: "Alumnos", url: "#", icon: UsersRound },
    { title: "Projects", url: "#", icon: FolderIcon },
    { title: "Team", url: "#", icon: UsersIcon },
  ],
  navSecondary: [
    { title: "Settings", url: "#", icon: SettingsIcon },
    { title: "Get Help", url: "#", icon: HelpCircleIcon },
    { title: "Search", url: "#", icon: SearchIcon },
  ],
  documents: [
    { name: "Data Library", url: "#", icon: DatabaseIcon },
    { name: "Reports", url: "#", icon: ClipboardListIcon },
    { name: "Word Assistant", url: "#", icon: FileIcon },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const asignaturas = useMisAsignaturas()
  const cursos = useMisCursos() 

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <Eye className="h-16 w-16" />
                <span className="text-base font-bold">RA CONTROL V.1</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavDocuments items={data.documents} />

        {/* 👇 Aquí mostramos las asignaturas */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <span className="text-zinc-950 text-xs font-bold">
                Mis Asignaturas
              </span>
            </SidebarMenuButton>
          </SidebarMenuItem>

         {asignaturas.map((asig) => (
            <SidebarMenuItem key={asig.id}>
              <SidebarMenuButton asChild>
                <a href="#">
                <span className="text-xs text-zinc-500">{asig.id}</span> - <span className="text-xs text-zinc-950">{asig.nombre}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>

        <SidebarMenu>
  <SidebarMenuItem>
    <SidebarMenuButton asChild>
      <span className="text-zinc-950 text-xs font-bold">
                Mis Cursos
              </span>
    </SidebarMenuButton>
  </SidebarMenuItem>

  {cursos.map((curso) => (
    <SidebarMenuItem key={curso.acronimo}>
      <SidebarMenuButton asChild>
        <a href="#">
          <span className="code-section-title">{curso.acronimo}</span> –{" "}
          <span className="name-section-title">{curso.nombre}</span>
        </a>
      </SidebarMenuButton>
    </SidebarMenuItem>
  ))}
</SidebarMenu>


        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}

