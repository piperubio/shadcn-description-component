"use client";

import React, { createContext, useContext } from "react";
import type { ReactNode } from "react";
import { Card } from "@/components/ui/card";

// Context para pasar el número de columnas
const DescriptionContext = createContext<{ columns: number }>({ columns: 3 });

interface DescriptionItemProps {
  label: string;
  value: ReactNode;
  className?: string;
  span?: 1 | 2 | 3;
}

interface DescriptionSectionProps {
  label: string;
  children: ReactNode;
  className?: string;
}

interface DescriptionProps {
  title?: string;
  children: ReactNode;
  className?: string;
  columns?: 1 | 2 | 3;
  variant?: "basic" | "bordered";
}

export function DescriptionItem({
  label,
  value,
  className = "",
  span = 1,
}: DescriptionItemProps) {
  const { columns } = useContext(DescriptionContext);

  // Generate the appropriate col-span class based on span value
  const getColSpanClass = (span: number = 1, maxColumns: number = 3) => {
    // Validar que span sea un número válido
    if (typeof span !== "number" || span <= 0 || isNaN(span)) {
      span = 1;
    }

    // Limitar el span al número máximo de columnas
    const effectiveSpan = Math.min(span, maxColumns);

    switch (effectiveSpan) {
      case 1:
        return "col-span-1";
      case 2:
        return "col-span-2";
      case 3:
        return "col-span-3";
      default:
        return "col-span-1";
    }
  };

  const colSpanClass = getColSpanClass(span, columns);

  return (
    <div
      className={`description-item ${colSpanClass} ${className}`}
      data-span={span}
    >
      <span className="description-label">{label}:</span>
      <span className="description-value">{value}</span>
    </div>
  );
}

export function DescriptionSection({
  label,
  children,
  className = "",
}: DescriptionSectionProps) {
  return (
    <div className={`description-section ${className}`}>
      <div className="description-section-label">{label}</div>
      <div className="description-section-content">{children}</div>
    </div>
  );
}

export function Description({
  title,
  children,
  className = "",
  columns = 3,
  variant = "basic",
}: DescriptionProps) {
  const gridCols = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
  };

  if (variant === "bordered") {
    const borderedGridCols = {
      1: "grid-cols-1",
      2: "grid-cols-1 lg:grid-cols-2",
      3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    };

    const divider =
      columns === 1
        ? "divide-y"
        : columns === 2
        ? "divide-y lg:divide-y-0 lg:divide-x"
        : "divide-y md:divide-y-0 md:divide-x lg:divide-x";

    return (
      <DescriptionContext.Provider value={{ columns }}>
        <div className="">
          {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
          <Card className="p-0 overflow-hidden">
            <div
              className={`grid ${borderedGridCols[columns]} ${divider} description-bordered ${className}`}
            >
              {children}
            </div>
          </Card>
        </div>
      </DescriptionContext.Provider>
    );
  }

  return (
    <DescriptionContext.Provider value={{ columns }}>
      <div className="">
        {title && <h2 className="text-xl font-semibold mb-4">{title}</h2>}
        <div
          className={`grid ${gridCols[columns]} gap-6 text-sm description-basic ${className}`}
        >
          {children}
        </div>
      </div>
    </DescriptionContext.Provider>
  );
}
