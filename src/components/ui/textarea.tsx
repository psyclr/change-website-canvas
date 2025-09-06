import * as React from "react"

import { cn } from "@/lib/utils"

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  variant?: 'default' | 'bold'
  error?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, variant = 'default', error = false, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          // Base styles
          "flex w-full bg-background font-body transition-all duration-200 ease-out placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 resize-y",
          
          // Variant styles
          variant === 'bold' && [
            "min-h-[120px] rounded-[12px] border px-4 py-3 text-body-mobile md:text-body-desktop",
            // Normal state
            !error && "border-muted focus-visible:outline-none focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20",
            // Error state
            error && "border-red-500 focus-visible:outline-none focus-visible:border-red-500 focus-visible:ring-2 focus-visible:ring-red-500/20"
          ],
          
          // Default variant (legacy)
          variant === 'default' && "min-h-[80px] rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Textarea.displayName = "Textarea"

export { Textarea }
