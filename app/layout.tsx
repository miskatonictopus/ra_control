// app/layout.tsx

import type { Metadata } from "next"
import "./globals.css"

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
    <html lang="es">
      <body className="bg-zinc-950 text-foreground">{children}</body>
    </html>
  )
}
