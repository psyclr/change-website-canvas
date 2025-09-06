import * as React from "react"

import { cn } from "@/lib/utils"

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'bold' | 'interactive'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      // Base styles
      "bg-card text-card-foreground",
      // Variant styles
      variant === 'bold' && "rounded-[12px] border border-muted shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)]",
      variant === 'interactive' && "rounded-[12px] border border-muted shadow-md transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_10px_25px_-5px_rgba(0,0,0,0.1)] cursor-pointer",
      variant === 'default' && "rounded-lg border shadow-sm",
      className
    )}
    {...props}
  />
))
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'bold'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex flex-col",
      variant === 'bold' 
        ? "space-y-3 p-6 md:p-8" 
        : "space-y-1.5 p-6",
      className
    )}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement> & {
    variant?: 'default' | 'bold'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      variant === 'bold' 
        ? "font-heading font-medium text-h3-mobile md:text-h3-desktop leading-tight" 
        : "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement> & {
    variant?: 'default' | 'bold'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <p
    ref={ref}
    className={cn(
      variant === 'bold'
        ? "text-body-mobile md:text-body-desktop text-fg/70 leading-relaxed"
        : "text-sm text-muted-foreground",
      className
    )}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'bold'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div 
    ref={ref} 
    className={cn(
      variant === 'bold' 
        ? "p-6 pt-0 md:px-8 md:pt-0" 
        : "p-6 pt-0",
      className
    )} 
    {...props} 
  />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    variant?: 'default' | 'bold'
  }
>(({ className, variant = 'default', ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center",
      variant === 'bold' 
        ? "p-6 pt-0 md:px-8 md:pt-0" 
        : "p-6 pt-0",
      className
    )}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
