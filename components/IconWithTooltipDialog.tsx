"use client"

import { useState } from "react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface IconWithTooltipDialogProps {
  children: ReactNode
  tooltip: string
  title: ReactNode
  content: ReactNode
  buttonClassName?: string
  buttonVariant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"
  buttonSize?: "default" | "sm" | "lg" | "icon"
}

export function IconWithTooltipDialog({
  children,
  tooltip,
  title,
  content,
  buttonClassName = "",
  buttonVariant = "outline",
  buttonSize = "sm",
}: IconWithTooltipDialogProps) {
  const [open, setOpen] = useState(false)

  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild>
          <Button
            variant={buttonVariant}
            size={buttonSize}
            className={buttonClassName}
            onClick={() => setOpen(true)}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="bg-zinc-900 border border-zinc-700 text-white max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          {content}
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  )
}
