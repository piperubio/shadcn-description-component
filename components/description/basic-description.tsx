import type { ReactNode } from "react"

interface DescriptionItemProps {
  label: string
  value: ReactNode
  className?: string
}

interface BasicDescriptionProps {
  title?: string
  children: ReactNode
  className?: string
  columns?: 1 | 2 | 3
}

export function DescriptionItem({ label, value, className = "" }: DescriptionItemProps) {
  return (
    <div className={`flex gap-2 ${className}`}>
      <span className="text-muted-foreground shrink-0">{label}:</span>
      <span className="font-medium break-words">{value}</span>
    </div>
  )
}

export function BasicDescription({ title, children, className = "", columns = 3 }: BasicDescriptionProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  }

  return (
    <div className={className}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <div className={`grid ${gridCols[columns]} gap-6 text-sm`}>{children}</div>
    </div>
  )
}
