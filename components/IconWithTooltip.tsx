"use client"

import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip"
import { Button } from "@/components/ui/button"
import { ReactNode } from "react"

interface IconWithTooltipProps {
  children: ReactNode
  tooltip: string
  onClick?: () => void
  buttonClassName?: string
  buttonVariant?: "default" | "outline" | "ghost" | "link" | "secondary" | "destructive"
  buttonSize?: "default" | "sm" | "lg" | "icon"
}

export function IconWithTooltip({
  children,
  tooltip,
  onClick,
  buttonClassName = "",
  buttonVariant = "ghost",
  buttonSize = "icon",
}: IconWithTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            onClick={onClick}
            variant={buttonVariant}
            size={buttonSize}
            className={buttonClassName}
          >
            {children}
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

