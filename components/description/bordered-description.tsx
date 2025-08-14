import type { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface BorderedItemProps {
  label: string
  value: ReactNode
  span?: 1 | 2
}

interface BorderedSectionProps {
  label: string
  children: ReactNode
}

interface BorderedDescriptionProps {
  title?: string
  children: ReactNode
  className?: string
  columns?: 1 | 2
}

export function BorderedItem({ label, value, span = 1 }: BorderedItemProps) {
  const isFullWidth = span === 2

  if (isFullWidth) {
    return (
      <div className="col-span-full grid grid-cols-1 border-b last:border-b-0">
        <div className="p-4 bg-muted/30 text-sm font-medium text-muted-foreground border-b">{label}</div>
        <div className="p-4 text-sm break-words">{value}</div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 border-b last:border-b-0">
      <div className="p-4 bg-muted/30 text-sm font-medium text-muted-foreground border-r shrink-0">{label}</div>
      <div className="p-4 text-sm break-words">{value}</div>
    </div>
  )
}

export function BorderedSection({ label, children }: BorderedSectionProps) {
  return (
    <div className="grid grid-cols-1 border-b last:border-b-0">
      <div className="p-4 bg-muted/30 text-sm font-medium text-muted-foreground border-b">{label}</div>
      <div className="p-4 text-sm space-y-1">{children}</div>
    </div>
  )
}

export function BorderedDescription({ title, children, className = "", columns = 2 }: BorderedDescriptionProps) {
  const gridCols = columns === 1 ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
  const divider = columns === 1 ? "divide-y" : "divide-y lg:divide-y-0 lg:divide-x"

  return (
    <div className={className}>
      {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
      <Card className="p-0 overflow-hidden">
        <div className={`grid ${gridCols} ${divider}`}>{children}</div>
      </Card>
    </div>
  )
}
