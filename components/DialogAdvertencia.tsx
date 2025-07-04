// components/DialogAdvertencia.tsx
"use client"

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

// 1. Primer Modal: Advertencia
export function DialogAdvertencia({
  open,
  onCancelar,
  onAceptar,
  titulo,
  descripcion,
}: {
  open: boolean
  onCancelar: () => void
  onAceptar: () => void
  titulo: string
  descripcion: string
}) {
  return (
    <Dialog open={open} onOpenChange={onCancelar}>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>{titulo}</DialogTitle>
          <DialogDescription className="text-zinc-400">
            {descripcion}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onCancelar}>Cancelar</Button>
          <Button onClick={onAceptar}>Entiendo el riesgo</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// 2. Segundo Modal: Confirmación por texto
export function DialogConfirmacionTexto({
  open,
  onCancelar,
  onConfirmar,
  palabraClave = "EDITAR",
}: {
  open: boolean
  onCancelar: () => void
  onConfirmar: () => void
  palabraClave?: string
}) {
  const [texto, setTexto] = useState("")
  const coincide = texto.trim().toUpperCase() === palabraClave.toUpperCase()

  return (
    <Dialog open={open} onOpenChange={onCancelar}>
      <DialogContent className="bg-zinc-900 border border-zinc-700 text-white">
        <DialogHeader>
          <DialogTitle>Confirmación requerida</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Por favor, escribe <span className="font-bold text-white">{palabraClave}</span> para continuar.
          </DialogDescription>
        </DialogHeader>
        <Input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder={`Escribe "${palabraClave}" aquí...`}
          className="bg-zinc-800 text-white"
        />
        <DialogFooter className="mt-4">
          <Button variant="secondary" onClick={onCancelar}>Cancelar</Button>
          <Button onClick={onConfirmar} disabled={!coincide}>
            Confirmar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
