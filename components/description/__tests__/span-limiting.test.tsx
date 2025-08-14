import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Description, DescriptionItem } from "../description";

describe("Description Span Limiting Behavior", () => {
  describe("Context-based span limiting", () => {
    it("correctly limits span in 1-column layout", () => {
      render(
        <Description columns={1} data-testid="container">
          <DescriptionItem label="Item 1" value="Value 1" span={1} />
          <DescriptionItem label="Item 2" value="Value 2" span={2} />
          <DescriptionItem label="Item 3" value="Value 3" span={3} />
        </Description>
      );

      // Todos los elementos deben tener col-span-1 en un layout de 1 columna
      const items = [
        screen.getByText("Item 1:").parentElement,
        screen.getByText("Item 2:").parentElement,
        screen.getByText("Item 3:").parentElement,
      ];

      items.forEach((item, index) => {
        expect(item).toHaveClass("col-span-1");
        expect(item).toHaveAttribute("data-span", String(index + 1));
      });
    });

    it("correctly limits span in 2-column layout", () => {
      render(
        <Description columns={2}>
          <DescriptionItem label="Item 1" value="Value 1" span={1} />
          <DescriptionItem label="Item 2" value="Value 2" span={2} />
          <DescriptionItem label="Item 3" value="Value 3" span={3} />
        </Description>
      );

      const item1 = screen.getByText("Item 1:").parentElement;
      const item2 = screen.getByText("Item 2:").parentElement;
      const item3 = screen.getByText("Item 3:").parentElement;

      expect(item1).toHaveClass("col-span-1");
      expect(item1).toHaveAttribute("data-span", "1");

      expect(item2).toHaveClass("col-span-2");
      expect(item2).toHaveAttribute("data-span", "2");

      // span={3} debe limitarse a col-span-2
      expect(item3).toHaveClass("col-span-2");
      expect(item3).toHaveAttribute("data-span", "3");
    });

    it("allows all spans in 3-column layout", () => {
      render(
        <Description columns={3}>
          <DescriptionItem label="Item 1" value="Value 1" span={1} />
          <DescriptionItem label="Item 2" value="Value 2" span={2} />
          <DescriptionItem label="Item 3" value="Value 3" span={3} />
        </Description>
      );

      const item1 = screen.getByText("Item 1:").parentElement;
      const item2 = screen.getByText("Item 2:").parentElement;
      const item3 = screen.getByText("Item 3:").parentElement;

      expect(item1).toHaveClass("col-span-1");
      expect(item1).toHaveAttribute("data-span", "1");

      expect(item2).toHaveClass("col-span-2");
      expect(item2).toHaveAttribute("data-span", "2");

      expect(item3).toHaveClass("col-span-3");
      expect(item3).toHaveAttribute("data-span", "3");
    });
  });

  describe("Math.min span calculation", () => {
    const testCases = [
      { columns: 1, span: 1, expected: "col-span-1" },
      { columns: 1, span: 2, expected: "col-span-1" },
      { columns: 1, span: 3, expected: "col-span-1" },
      { columns: 2, span: 1, expected: "col-span-1" },
      { columns: 2, span: 2, expected: "col-span-2" },
      { columns: 2, span: 3, expected: "col-span-2" },
      { columns: 3, span: 1, expected: "col-span-1" },
      { columns: 3, span: 2, expected: "col-span-2" },
      { columns: 3, span: 3, expected: "col-span-3" },
    ];

    testCases.forEach(({ columns, span, expected }) => {
      it(`applies ${expected} when columns=${columns} and span=${span}`, () => {
        render(
          <Description columns={columns as 1 | 2 | 3}>
            <DescriptionItem
              label="Test"
              value="Value"
              span={span as 1 | 2 | 3}
            />
          </Description>
        );

        const item = screen.getByText("Test:").parentElement;
        expect(item).toHaveClass(expected);
        expect(item).toHaveAttribute("data-span", String(span));
      });
    });
  });

  describe("Real-world scenarios", () => {
    it("user profile with mixed spans in 3-column layout", () => {
      render(
        <Description columns={3} title="User Profile">
          <DescriptionItem label="Name" value="John Doe" span={1} />
          <DescriptionItem label="Email" value="john@example.com" span={1} />
          <DescriptionItem label="Role" value="Administrator" span={1} />
          <DescriptionItem label="Status" value="Active (spans 2)" span={2} />
          <DescriptionItem
            label="Bio"
            value="Full description (spans 3)"
            span={3}
          />
          <DescriptionItem label="Department" value="Engineering" span={1} />
          <DescriptionItem
            label="Location"
            value="San Francisco (spans 2)"
            span={2}
          />
        </Description>
      );

      // Verificar layout esperado
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Email:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Role:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Status:").parentElement).toHaveClass(
        "col-span-2"
      );
      expect(screen.getByText("Bio:").parentElement).toHaveClass("col-span-3");
      expect(screen.getByText("Department:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Location:").parentElement).toHaveClass(
        "col-span-2"
      );
    });

    it("contact form with automatic span limiting in 2-column layout", () => {
      render(
        <Description columns={2} title="Contact Information">
          <DescriptionItem label="Name" value="Jane Smith" span={1} />
          <DescriptionItem label="Email" value="jane@company.com" span={1} />
          <DescriptionItem label="Phone" value="+1 (555) 123-4567" span={1} />
          <DescriptionItem
            label="Address"
            value="123 Main St, Anytown, USA"
            span={2}
          />
          <DescriptionItem
            label="Bio"
            value="Marketing professional with experience"
            span={3}
          />
          <DescriptionItem label="Department" value="Marketing" span={1} />
          <DescriptionItem label="Position" value="Manager" span={1} />
        </Description>
      );

      // Verificar que span={3} se limita automáticamente a 2
      const bioItem = screen.getByText("Bio:").parentElement;
      expect(bioItem).toHaveClass("col-span-2");
      expect(bioItem).toHaveAttribute("data-span", "3");

      // Verificar otros elementos
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Address:").parentElement).toHaveClass(
        "col-span-2"
      );
      expect(screen.getByText("Department:").parentElement).toHaveClass(
        "col-span-1"
      );
    });

    it("mobile-friendly single column layout", () => {
      render(
        <Description columns={1} title="Mobile View">
          <DescriptionItem label="Name" value="Mobile User" span={1} />
          <DescriptionItem
            label="Description"
            value="Should be full width"
            span={3}
          />
          <DescriptionItem
            label="Notes"
            value="Another full width item"
            span={2}
          />
        </Description>
      );

      // Todos los elementos deben ser col-span-1 en layout móvil
      const items = screen
        .getAllByText(/:$/)
        .map((label) => label.parentElement);

      items.forEach((item) => {
        expect(item).toHaveClass("col-span-1");
      });

      // Verificar que los data-span originales se mantienen
      expect(screen.getByText("Name:").parentElement).toHaveAttribute(
        "data-span",
        "1"
      );
      expect(screen.getByText("Description:").parentElement).toHaveAttribute(
        "data-span",
        "3"
      );
      expect(screen.getByText("Notes:").parentElement).toHaveAttribute(
        "data-span",
        "2"
      );
    });
  });

  describe("Edge cases and error handling", () => {
    it("handles undefined or invalid span values", () => {
      render(
        <Description columns={3}>
          <DescriptionItem label="Default" value="No span prop" />
          <DescriptionItem label="Zero" value="Zero span" span={0 as any} />
          <DescriptionItem
            label="Negative"
            value="Negative span"
            span={-1 as any}
          />
          <DescriptionItem label="Large" value="Large span" span={100 as any} />
        </Description>
      );

      // Todos deben usar col-span-1 por defecto o limitarse al máximo
      expect(screen.getByText("Default:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Zero:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Negative:").parentElement).toHaveClass(
        "col-span-1"
      );
      expect(screen.getByText("Large:").parentElement).toHaveClass(
        "col-span-3"
      ); // Math.min(100, 3) = 3
    });

    it("maintains context isolation between different Description components", () => {
      render(
        <div>
          <Description columns={2} data-testid="container-1">
            <DescriptionItem label="Item A" value="Value A" span={3} />
          </Description>
          <Description columns={3} data-testid="container-2">
            <DescriptionItem label="Item B" value="Value B" span={3} />
          </Description>
        </div>
      );

      // El primer item debe limitarse a 2 columnas
      expect(screen.getByText("Item A:").parentElement).toHaveClass(
        "col-span-2"
      );

      // El segundo item debe usar las 3 columnas completas
      expect(screen.getByText("Item B:").parentElement).toHaveClass(
        "col-span-3"
      );
    });
  });
});
