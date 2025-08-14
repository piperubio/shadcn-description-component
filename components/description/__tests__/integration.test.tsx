import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Description, DescriptionItem } from "../description";

describe("Description Integration Tests", () => {
  describe("Real-world usage patterns", () => {
    it("user profile page scenario", () => {
      render(
        <div>
          <Description title="User Profile" columns={3} variant="basic">
            <DescriptionItem label="Name" value="John Doe" />
            <DescriptionItem label="Email" value="john@example.com" />
            <DescriptionItem label="Role" value="Administrator" />
            <DescriptionItem
              label="Status"
              value={<span className="text-green-600">Active</span>}
              span={2}
            />
            <DescriptionItem
              label="Bio"
              value="Full-stack developer with 5+ years of experience in React and Node.js"
              span={3}
            />
            <DescriptionItem label="Department" value="Engineering" />
            <DescriptionItem
              label="Location"
              value="San Francisco, CA"
              span={2}
            />
          </Description>
        </div>
      );

      // Verificar contenido
      expect(screen.getByText("User Profile")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Active")).toHaveClass("text-green-600");

      // Verificar estructura de spans
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Status:").parentElement).toHaveClass(
        "col-span-2"
      );
      expect(screen.getByText("Bio:").parentElement).toHaveClass("col-span-3");
      expect(screen.getByText("Location:").parentElement).toHaveClass(
        "col-span-2"
      );

      // Verificar layout básico
      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("responsive mobile scenario with automatic span limiting", () => {
      render(
        <Description title="Contact Information" columns={2} variant="basic">
          <DescriptionItem label="Name" value="Jane Smith" />
          <DescriptionItem label="Email" value="jane@company.com" />
          <DescriptionItem label="Phone" value="+1 (555) 123-4567" />
          <DescriptionItem
            label="Address"
            value="123 Main St, Anytown, USA 12345"
            span={2}
          />
          <DescriptionItem
            label="Bio"
            value="Marketing professional with extensive experience in digital campaigns and brand management"
            span={3} // Debe limitarse a 2
          />
          <DescriptionItem label="Department" value="Marketing" />
          <DescriptionItem label="Position" value="Senior Manager" />
        </Description>
      );

      // Verificar contenido
      expect(screen.getByText("Contact Information")).toBeInTheDocument();
      expect(screen.getByText("Jane Smith")).toBeInTheDocument();
      expect(
        screen.getByText("123 Main St, Anytown, USA 12345")
      ).toBeInTheDocument();

      // Verificar span limiting en acción
      const bioItem = screen.getByText("Bio:").parentElement;
      expect(bioItem).toHaveClass("col-span-2"); // span={3} limitado a 2
      expect(bioItem).toHaveAttribute("data-span", "3"); // valor original preservado

      // Verificar otros spans
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Address:").parentElement).toHaveClass(
        "col-span-2"
      );

      // Verificar layout responsivo de 2 columnas
      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass("grid-cols-1", "md:grid-cols-2");
    });

    it("complex dashboard scenario with bordered variant", () => {
      render(
        <Description
          title="Service Configuration"
          columns={3}
          variant="bordered"
        >
          <DescriptionItem label="Service" value="Cloud Database" />
          <DescriptionItem
            label="Plan"
            value={
              <span className="bg-blue-100 px-2 py-1 rounded">
                Professional
              </span>
            }
          />
          <DescriptionItem
            label="Status"
            value={<span className="text-green-600 font-semibold">Active</span>}
          />
          <DescriptionItem label="Region" value="US East (Virginia)" />
          <DescriptionItem label="Created" value="2024-01-15 10:30:00" />
          <DescriptionItem
            label="Configuration"
            value="PostgreSQL 14, 100GB SSD, 8GB RAM"
            span={3}
          />
        </Description>
      );

      // Verificar contenido y componentes JSX
      expect(screen.getByText("Service Configuration")).toBeInTheDocument();
      expect(screen.getByText("Professional")).toBeInTheDocument();
      expect(screen.getByText("Professional")).toHaveClass(
        "bg-blue-100",
        "px-2",
        "py-1",
        "rounded"
      );
      expect(screen.getByText("Active")).toHaveClass(
        "text-green-600",
        "font-semibold"
      );

      // Verificar spans en layout de 3 columnas
      expect(screen.getByText("Service:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Configuration:").parentElement).toHaveClass(
        "col-span-3"
      );

      // Verificar bordered variant
      const container = screen
        .getByText("Service:")
        .closest(".description-bordered");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass(
        "divide-y",
        "md:divide-y-0",
        "md:divide-x",
        "lg:divide-x"
      );
    });

    it("form layout with mixed content types", () => {
      const customComponent = (
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span>Online</span>
        </div>
      );

      render(
        <Description title="User Details" columns={2} variant="basic">
          <DescriptionItem label="ID" value="USR-12345" />
          <DescriptionItem label="Username" value="johndoe" />
          <DescriptionItem label="Status" value={customComponent} />
          <DescriptionItem label="Last Login" value="2024-08-14 15:30:00" />
          <DescriptionItem
            label="Permissions"
            value={
              <div className="space-y-1">
                <div>• Admin Dashboard</div>
                <div>• User Management</div>
                <div>• System Settings</div>
              </div>
            }
            span={2}
          />
          <DescriptionItem label="Created" value="2023-01-15" />
          <DescriptionItem label="Updated" value="2024-08-10" />
        </Description>
      );

      // Verificar contenido complejo
      expect(screen.getByText("User Details")).toBeInTheDocument();
      expect(screen.getByText("USR-12345")).toBeInTheDocument();
      expect(screen.getByText("Online")).toBeInTheDocument();
      expect(screen.getByText("• Admin Dashboard")).toBeInTheDocument();

      // Verificar que los componentes personalizados se renderizan
      const statusContainer = screen.getByText("Online").parentElement;
      expect(statusContainer).toHaveClass("flex", "items-center", "gap-2");

      // Verificar spans en layout de 2 columnas
      expect(screen.getByText("Permissions:").parentElement).toHaveClass(
        "col-span-2"
      );
      expect(screen.getByText("Created:").parentElement).toHaveClass(
        "col-span-1"
      );
    });
  });

  describe("Edge cases and error recovery", () => {
    it("handles empty content gracefully", () => {
      render(
        <Description title="Empty Example">
          <div></div>
        </Description>
      );

      expect(screen.getByText("Empty Example")).toBeInTheDocument();

      const container = screen.getByText("Empty Example").nextElementSibling;
      expect(container).toBeInTheDocument();
    });

    it("handles mixed valid and invalid spans", () => {
      render(
        <Description columns={2}>
          <DescriptionItem label="Valid 1" value="Normal item" span={1} />
          <DescriptionItem label="Valid 2" value="Spans 2 columns" span={2} />
          <DescriptionItem
            label="Invalid"
            value="Invalid span"
            span={0 as any}
          />
          <DescriptionItem
            label="Limited"
            value="Should be limited"
            span={5 as any}
          />
        </Description>
      );

      // Verificar que los spans válidos funcionan
      expect(screen.getByText("Valid 1:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Valid 2:").parentElement).toHaveClass(
        "col-span-2"
      );

      // Verificar que los spans inválidos usan el default
      expect(screen.getByText("Invalid:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Limited:").parentElement).toHaveClass(
        "col-span-2"
      ); // Math.min(5, 2) = 2
    });

    it("handles very long content", () => {
      const longText =
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ".repeat(10);

      render(
        <Description columns={3}>
          <DescriptionItem label="Short" value="Short text" />
          <DescriptionItem label="Long" value={longText} span={3} />
          <DescriptionItem label="Normal" value="Normal text" />
        </Description>
      );

      expect(screen.getByText("Short text")).toBeInTheDocument();
      expect(screen.getByText("Long:")).toBeInTheDocument(); // Solo verificar que existe el label
      expect(screen.getByText("Normal text")).toBeInTheDocument();

      // Verificar que el texto largo ocupa toda la fila
      expect(screen.getByText("Long:").parentElement).toHaveClass("col-span-3");
    });
  });

  describe("Performance and re-rendering", () => {
    it("maintains context values correctly across re-renders", () => {
      const { rerender } = render(
        <Description columns={2}>
          <DescriptionItem label="Test" value="Value" span={3} />
        </Description>
      );

      // Inicial: span limitado a 2
      expect(screen.getByText("Test:").parentElement).toHaveClass("col-span-2");

      rerender(
        <Description columns={3}>
          <DescriptionItem label="Test" value="Value" span={3} />
        </Description>
      );

      // Después del re-render: span completo de 3
      expect(screen.getByText("Test:").parentElement).toHaveClass("col-span-3");

      rerender(
        <Description columns={1}>
          <DescriptionItem label="Test" value="Value" span={3} />
        </Description>
      );

      // Después del segundo re-render: span limitado a 1
      expect(screen.getByText("Test:").parentElement).toHaveClass("col-span-1");
    });

    it("handles dynamic children correctly", () => {
      const items = [
        { label: "Item 1", value: "Value 1", span: 1 },
        { label: "Item 2", value: "Value 2", span: 2 },
      ];

      const { rerender } = render(
        <Description columns={3}>
          {items.map((item, index) => (
            <DescriptionItem
              key={index}
              label={item.label}
              value={item.value}
              span={item.span as 1 | 2 | 3}
            />
          ))}
        </Description>
      );

      expect(screen.getByText("Value 1")).toBeInTheDocument();
      expect(screen.getByText("Value 2")).toBeInTheDocument();

      // Agregar más items
      const moreItems = [
        ...items,
        { label: "Item 3", value: "Value 3", span: 3 },
      ];

      rerender(
        <Description columns={3}>
          {moreItems.map((item, index) => (
            <DescriptionItem
              key={index}
              label={item.label}
              value={item.value}
              span={item.span as 1 | 2 | 3}
            />
          ))}
        </Description>
      );

      expect(screen.getByText("Value 3")).toBeInTheDocument();
      expect(screen.getByText("Item 3:").parentElement).toHaveClass(
        "col-span-3"
      );
    });
  });
});
