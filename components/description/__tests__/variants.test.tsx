import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Description,
  DescriptionItem,
  DescriptionSection,
} from "../description";

describe("Description Variants", () => {
  describe("Basic Variant", () => {
    it("renders with correct default classes", () => {
      render(
        <Description data-testid="description">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toBeInTheDocument();
      expect(container).toHaveClass("grid", "gap-6", "text-sm");
    });

    it("applies correct grid classes for different column counts", () => {
      const { rerender } = render(
        <Description columns={1}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );

      let container = screen.getByText("Test:").closest(".description-basic");
      expect(container).toHaveClass("grid-cols-1");

      rerender(
        <Description columns={2}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-basic");
      expect(container).toHaveClass("grid-cols-1", "md:grid-cols-2");

      rerender(
        <Description columns={3}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-basic");
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("does not have dividers", () => {
      render(
        <Description variant="basic">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).not.toHaveClass("divide-y");
      expect(container).not.toHaveClass("divide-x");
    });

    it("maintains spacing with gap classes", () => {
      render(
        <Description variant="basic">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass("gap-6");
    });
  });

  describe("Bordered Variant", () => {
    it("renders with Card wrapper", () => {
      render(
        <Description variant="bordered">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen
        .getByText("Name:")
        .closest(".description-bordered");
      expect(container).toBeInTheDocument();

      // Verificar que está dentro de un Card
      const card = container?.closest('[data-slot="card"]'); // Card tiene data-slot="card"
      expect(card).toBeInTheDocument();
    });

    it("applies correct grid classes for bordered layout", () => {
      const { rerender } = render(
        <Description variant="bordered" columns={1}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );

      let container = screen
        .getByText("Test:")
        .closest(".description-bordered");
      expect(container).toHaveClass("grid-cols-1");

      rerender(
        <Description variant="bordered" columns={2}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-bordered");
      expect(container).toHaveClass("grid-cols-1", "lg:grid-cols-2");

      rerender(
        <Description variant="bordered" columns={3}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-bordered");
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("applies correct divider classes", () => {
      const { rerender } = render(
        <Description variant="bordered" columns={1}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );

      let container = screen
        .getByText("Test:")
        .closest(".description-bordered");
      expect(container).toHaveClass("divide-y");

      rerender(
        <Description variant="bordered" columns={2}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-bordered");
      expect(container).toHaveClass("divide-y", "lg:divide-y-0", "lg:divide-x");

      rerender(
        <Description variant="bordered" columns={3}>
          <DescriptionItem label="Test" value="Value" />
        </Description>
      );
      container = screen.getByText("Test:").closest(".description-bordered");
      expect(container).toHaveClass(
        "divide-y",
        "md:divide-y-0",
        "md:divide-x",
        "lg:divide-x"
      );
    });

    it("works with DescriptionSection", () => {
      render(
        <Description variant="bordered">
          <DescriptionSection label="Personal Information">
            <div>John Doe</div>
            <div>john@example.com</div>
          </DescriptionSection>
        </Description>
      );

      expect(screen.getByText("Personal Information")).toBeInTheDocument();
      expect(screen.getByText("John Doe")).toBeInTheDocument();
      expect(screen.getByText("john@example.com")).toBeInTheDocument();

      const section = screen
        .getByText("Personal Information")
        .closest(".description-section");
      expect(section).toBeInTheDocument();
    });
  });

  describe("Variant Comparison", () => {
    it("basic variant has gap, bordered variant has dividers", () => {
      const { rerender } = render(
        <Description variant="basic">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      let container = screen.getByText("Name:").closest(".description-basic");
      expect(container).toHaveClass("gap-6");
      expect(container).not.toHaveClass("divide-y");

      rerender(
        <Description variant="bordered">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      container = screen.getByText("Name:").closest(".description-bordered");
      expect(container).not.toHaveClass("gap-6");
      expect(container).toHaveClass("divide-y");
    });

    it("bordered variant has Card wrapper, basic variant does not", () => {
      const { rerender } = render(
        <Description variant="basic" title="Basic Title">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      // En basic variant, el title está directamente en el wrapper
      let titleElement = screen.getByText("Basic Title");
      let cardWrapper = titleElement.closest('[class*="rounded-lg"]');
      expect(cardWrapper).toBeNull();

      rerender(
        <Description variant="bordered" title="Bordered Title">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      // En bordered variant, debe haber un Card wrapper
      titleElement = screen.getByText("Bordered Title");
      cardWrapper = screen.getByText("Name:").closest('[data-slot="card"]');
      expect(cardWrapper).toBeInTheDocument();
    });
  });

  describe("Responsive Behavior", () => {
    it("basic variant has progressive responsive breakpoints", () => {
      render(
        <Description variant="basic" columns={3}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      const container = screen.getByText("Name:").closest(".description-basic");
      // 1 column on mobile, 2 on md, 3 on lg
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });

    it("bordered variant has different responsive breakpoints", () => {
      const { rerender } = render(
        <Description variant="bordered" columns={2}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      let container = screen
        .getByText("Name:")
        .closest(".description-bordered");
      // 2 columns: 1 column on mobile, 2 on lg
      expect(container).toHaveClass("grid-cols-1", "lg:grid-cols-2");

      rerender(
        <Description variant="bordered" columns={3}>
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      container = screen.getByText("Name:").closest(".description-bordered");
      // 3 columns: 1 column on mobile, 2 on md, 3 on lg
      expect(container).toHaveClass(
        "grid-cols-1",
        "md:grid-cols-2",
        "lg:grid-cols-3"
      );
    });
  });

  describe("Title Rendering", () => {
    it("renders title in both variants", () => {
      const { rerender } = render(
        <Description variant="basic" title="Basic Title">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.getByText("Basic Title")).toBeInTheDocument();
      expect(screen.getByText("Basic Title").tagName).toBe("H2");

      rerender(
        <Description variant="bordered" title="Bordered Title">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.getByText("Bordered Title")).toBeInTheDocument();
      expect(screen.getByText("Bordered Title").tagName).toBe("H2");
    });

    it("does not render title when not provided in both variants", () => {
      const { rerender } = render(
        <Description variant="basic">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();

      rerender(
        <Description variant="bordered">
          <DescriptionItem label="Name" value="John Doe" />
        </Description>
      );

      expect(screen.queryByRole("heading")).not.toBeInTheDocument();
    });
  });
});
