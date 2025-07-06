// app/layout.tsx
import type { Metadata } from "next"
import "./globals.css"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { Toaster } from "sonner" // 👈 Importa Toaster

export const metadata: Metadata = {
  title: "CONTROL V-1",
  description: "Sistema de gestión de asignaturas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="dark">
      <body className="bg-zinc-950 text-foreground">
        <SidebarProvider>
          <div className="flex h-screen">
            <AppSidebar className="w-64 shrink-0 border-r border-zinc-800" />
            <main className="flex-1 overflow-auto relative">
              {children}
              <Toaster position="top-right" /> {/* 👈 Aquí se montan los toasts */}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  )
}
