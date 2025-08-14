import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Description,
  DescriptionItem,
  DescriptionSection,
} from "../description";

describe("Description Component", () => {
  describe("DescriptionItem", () => {
    it("renders label and value correctly", () => {
      render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });

    it("applies default span of 1", () => {
      render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("col-span-1");
      expect(item).toHaveAttribute("data-span", "1");
    });

    it("applies correct span classes", () => {
      const { rerender } = render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" span={2} />
        </Description>
      );

      let item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("col-span-2");
      expect(item).toHaveAttribute("data-span", "2");

      rerender(
        <Description>
          <DescriptionItem label="Name" value="John Doe" span={3} />
        </Description>
      );

      item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("col-span-3");
      expect(item).toHaveAttribute("data-span", "3");
    });

    it("limits span to maximum columns - 3 columns container", () => {
      render(
        <Description columns={3}>
          <DescriptionItem label="Name" value="John Doe" span={3} />
        </Description>
      );

      const item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("col-span-3");
      expect(item).toHaveAttribute("data-span", "3");
    });

    it("limits span to maximum columns - 2 columns container", () => {
      render(
        <Description columns={2}>
          <DescriptionItem label="Name" value="John Doe" span={3} />
        </Description>
      );

      const item = screen.getByText("Name:").parentElement;
      // span={3} debe limitarse a col-span-2 en un contenedor de 2 columnas
      expect(item).toHaveClass("col-span-2");
      expect(item).toHaveAttribute("data-span", "3"); // El data-span mantiene el valor original
    });

    it("limits span to maximum columns - 1 column container", () => {
      render(
        <Description columns={1}>
          <DescriptionItem label="Name" value="John Doe" span={3} />
        </Description>
      );

      const item = screen.getByText("Name:").parentElement;
      // span={3} debe limitarse a col-span-1 en un contenedor de 1 columna
      expect(item).toHaveClass("col-span-1");
      expect(item).toHaveAttribute("data-span", "3");
    });

    it("accepts ReactNode as value", () => {
      render(
        <Description>
          <DescriptionItem
            label="Status"
            value={<span className="text-green-600">Active</span>}
          />
        </Description>
      );

      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
      expect(screen.getByText("Active")).toHaveClass("text-green-600");
    });

    it("applies custom className", () => {
      render(
        <Description>
          <DescriptionItem
            label="Name"
            value="John Doe"
            className="custom-class"
          />
        </Description>
      );

      const item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("custom-class");
    });
  });

  describe("Description Container", () => {
    it("renders basic variant by default", () => {
      render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toBeInTheDocument();
    });

    it("renders bordered variant", () => {
      render(
        <Description variant="bordered">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen
        .getByText("Name:")
        .closest(".description-bordered");
      expect(container).toBeInTheDocument();
    });

    it("renders title when provided", () => {
      render(
        <Description title="User Profile">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.getByText("User Profile")).toBeInTheDocument();
      expect(screen.getByText("User Profile").tagName).toBe("H2");
    });

    it("does not render title when not provided", () => {
      render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });

    it("applies correct grid classes for different column counts", () => {
      const { rerender } = render(
        <Description columns={1}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      let container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass("grid-cols-1");

      rerender(
        <Description columns={2}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass("grid-cols-1", "md:grid-cols-2");

      rerender(
        <Description columns={3}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("applies custom className", () => {
      render(
        <Description className="custom-description">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const gridContainer = screen
        .getByText("Name:")
        .closest(".description-basic");
      expect(gridContainer).toHaveClass("custom-description");
    });
  });

  describe("DescriptionSection", () => {
    it("renders section with label and children", () => {
      render(
        <Description variant="bordered">
          <DescriptionSection label="Personal Information">
            <div>Some content</div>
          </DescriptionSection>
        </Description>
      );

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("Some content")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <Description variant="bordered">
          <DescriptionSection
            label="Personal Information"
            className="custom-section"
          >
            <div>Some content</div>
          </DescriptionSection>
        </Description>
      );

      const section = screen
        .getByText("Personal Information")
        .closest(".description-section");
      expect(section).toHaveClass("custom-section");
    });
  });

  describe("Complex Scenarios", () => {
    it("handles multiple items with different spans in 3-column layout", () => {
      render(
        <Description columns={3} title="User Profile">
          <DescriptionItem label="Name" value="John Doe" span={1} />
          <DescriptionItem label="Email" value="john@example.com" span={1} />
          <DescriptionItem label="Role" value="Admin" span={1} />
          <DescriptionItem label="Bio" value="Full-stack developer" span={3} />
          <DescriptionItem label="Department" value="Engineering" span={1} />
          <DescriptionItem label="Location" value="San Francisco" span={2} />
        </Description>
      );

      // Verificar que todos los elementos están presentes
      expect(screen.getByText("Name:")).toBeInTheDocument();
      expect(screen.getByText("Email:")).toBeInTheDocument();
      expect(screen.getByText("Role:")).toBeInTheDocument();
      expect(screen.getByText("Bio:")).toBeInTheDocument();
      expect(screen.getByText("Department:")).toBeInTheDocument();
      expect(screen.getByText("Location:")).toBeInTheDocument();

      // Verificar spans correctos
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Bio:").parentElement).toHaveClass("col-span-3");
      expect(screen.getByText("Location:").parentElement).toHaveClass(
        "col-span-2"
      );
    });

    it("handles multiple items with span limiting in 2-column layout", () => {
      render(
        <Description columns={2} title="Contact Information">
          <DescriptionItem label="Name" value="Jane Smith" span={1} />
          <DescriptionItem label="Email" value="jane@example.com" span={1} />
          <DescriptionItem label="Address" value="123 Main St" span={2} />
          <DescriptionItem
            label="Bio"
            value="Marketing professional"
            span={3}
          />{" "}
          {/* Debe limitarse a 2 */}
          <DescriptionItem label="Department" value="Marketing" span={1} />
        </Description>
      );

      // Verificar que el span={3} se limita a col-span-2
      const bioItem = screen.getByText("Bio:").parentElement;
      expect(bioItem).toHaveClass("col-span-2");
      expect(bioItem).toHaveAttribute("data-span", "3");

      // Verificar otros elementos
      expect(screen.getByText("Name:").parentElement).toHaveClass("col-span-1");
      expect(screen.getByText("Address:").parentElement).toHaveClass(
        "col-span-2"
      );
    });

    it("handles edge case with span=0 or invalid values", () => {
      render(
        <Description>
          <DescriptionItem label="Name" value="John Doe" span={0 as any} />
        </Description>
      );

      // Debe usar col-span-1 por defecto para valores inválidos
      const item = screen.getByText("Name:").parentElement;
      expect(item).toHaveClass("col-span-1");
    });
  });

  describe("Accessibility", () => {
    it("maintains proper semantic structure", () => {
      render(
        <Description title="User Profile">
          <DescriptionItem label="Name" value="John Doe" />
          <DescriptionItem label="Email" value="john@example.com" />
        </Description>
      );

      // Verificar que el título es un heading
      const heading = screen.getByRole("heading", { name: "User Profile" });
      expect(heading).toBeInTheDocument();
      expect(heading.tagName).toBe("H2");
    });

    it("provides proper text content for screen readers", () => {
      render(
        <Description>
          <DescriptionItem
            label="Status"
            value={<span className="text-green-600">Active</span>}
          />
        </Description>
      );

      // Verificar que el contenido es accesible
      expect(screen.getByText("Status:")).toBeInTheDocument();
      expect(screen.getByText("Active")).toBeInTheDocument();
    });
  });
});
