"use client"

import { Toaster as Sonner } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-ink group-[.toaster]:text-cream group-[.toaster]:border-transparent group-[.toaster]:rounded-sm group-[.toaster]:font-sans group-[.toaster]:shadow-xl",
          description: "group-[.toast]:text-cream/60",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground group-[.toast]:rounded-sm",
          cancelButton:
            "group-[.toast]:bg-cream/10 group-[.toast]:text-cream",
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
