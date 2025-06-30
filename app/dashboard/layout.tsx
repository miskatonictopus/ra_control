"use client"

import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { Header } from "@/components/Header"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <div className="flex bg-zinc-950 text-white w-screen h-screen overflow-hidden">
        <AppSidebar />
        <main className="flex flex-1 flex-col overflow-y-auto">
          {/* 👇 Añadimos el Header aquí */}
          <Header />
          <div className="flex-1 w-full overflow-y-auto">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  )
}