// app/dashboard/layout.tsx
"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex bg-zinc-950 text-white w-screen h-screen overflow-hidden">
        <AppSidebar />
        <main className="flex flex-1 overflow-y-auto">
          {/* 👇 Aquí sí se permite que el contenido interno gestione su layout */}
          <div className="flex-1 w-full">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}
