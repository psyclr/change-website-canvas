import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<
  HTMLInputElement, 
  React.ComponentProps<"input"> & {
    variant?: 'default' | 'bold'
    error?: boolean
  }
>(({ className, type, variant = 'default', error = false, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // Base styles
          "flex w-full bg-background font-body transition-all duration-200 ease-out file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
          
          // Variant styles
          variant === 'bold' && [
            "h-[44px] rounded-[12px] border px-4 py-3 text-body-mobile md:text-body-desktop",
            // Normal state
            !error && "border-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
            // Error state
            error && "border-red-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
          ],
          
          // Default variant (legacy)
          variant === 'default' && "h-10 rounded-md border border-input px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
