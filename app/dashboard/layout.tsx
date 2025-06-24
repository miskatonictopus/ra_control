// app/dashboard/layout.tsx
"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar" 
import { NavMain } from "@/components/nav-main"
import { LayoutDashboardIcon, BookOpenIcon } from "lucide-react"
import "@/styles/globals.css" // o la ruta que uses

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-zinc-950 text-foreground">
        <AppSidebar />
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </SidebarProvider>
  )
}
