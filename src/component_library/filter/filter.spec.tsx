import "@testing-library/jest-dom";
import React from "react";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ProductFilters, { FilterState } from "./ProductFilters";

jest.mock("@mui/material/Rating", () => {
    const React = require("react");
    return function MockRating({ value, onChange, precision }: {
        value: number;
        onChange: (e: React.SyntheticEvent, val: number | null) => void;
        precision?: number;
    }) {
        return (
            <input
                data-testid="mock-rating"
                type="range"
                min={0}
                max={5}
                step={precision ?? 1}
                value={value}
                onChange={(e) => onChange(e as unknown as React.SyntheticEvent, parseFloat(e.target.value))}
            />
        );
    };
});

// MUI Slider uses mouse position calculations that don't work in jsdom.
// Mock it as a plain range input so we can fire change events in tests.
jest.mock("@mui/material/Slider", () => {
    const React = require("react");
    return function MockSlider({ value, onChange, min, max }: {
        value: number[];
        onChange: (e: Event, val: number | number[]) => void;
        min?: number;
        max?: number;
    }) {
        return (
            <input
                data-testid="mock-slider"
                type="range"
                min={min ?? 0}
                max={max ?? 100}
                value={value[1]}
                onChange={(e) =>
                    onChange(e as unknown as Event, [value[0], parseFloat(e.target.value)])
                }
            />
        );
    };
});

// ─── Shared test data ────────────────────────────────────────────────────────

const mockAvailableCategories = ["beauty", "fragrances", "skincare"];
const mockMaxPrice = 100;

const defaultFilters: FilterState = {
    categories: [],
    priceRange: [0, mockMaxPrice],
    minRating: 0,
    sortBy: "default",
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

function renderFilters(
    filterOverrides: Partial<FilterState> = {},
    onFilterChange = jest.fn()
) {
    const filters: FilterState = { ...defaultFilters, ...filterOverrides };

    render(
        <ProductFilters
            availableCategories={mockAvailableCategories}
            maxPrice={mockMaxPrice}
            filters={filters}
            onFilterChange={onFilterChange}
        />
    );

    return { onFilterChange, filters };
}

// ─── Suite ───────────────────────────────────────────────────────────────────

describe("ProductFilters Component", () => {
    afterEach(() => {
        cleanup();
        jest.clearAllMocks();
    });

    // ── 1. Rendering ──────────────────────────────────────────────────────────

    describe("rendering", () => {
        it("renders all filter section headings", () => {
            renderFilters();

            expect(screen.getByText(/Filters/i)).toBeInTheDocument();
            expect(screen.getByText(/Sort By/i)).toBeInTheDocument();
            expect(screen.getByText(/Category/i)).toBeInTheDocument();
            expect(screen.getByText(/Price Range/i)).toBeInTheDocument();
            expect(screen.getByText(/Minimum Rating/i)).toBeInTheDocument();
        });

        it("renders all available category chips", () => {
            renderFilters();

            // Each category name is capitalised by the component
            expect(screen.getByText("Beauty")).toBeInTheDocument();
            expect(screen.getByText("Fragrances")).toBeInTheDocument();
            expect(screen.getByText("Skincare")).toBeInTheDocument();
        });

        it("does NOT render Clear All button when no filters are active", () => {
            renderFilters(); // defaultFilters → no active filters
            expect(screen.queryByText(/Clear All/i)).not.toBeInTheDocument();
        });

        it("renders Clear All button when at least one filter is active", () => {
            renderFilters({ categories: ["beauty"] });
            expect(screen.getByText(/Clear All/i)).toBeInTheDocument();
        });

        it("shows 'Any' rating label when minRating is 0", () => {
            renderFilters();
            expect(screen.getByText("Any")).toBeInTheDocument();
        });

        it("shows numeric rating label when minRating > 0", () => {
            renderFilters({ minRating: 3 });
            expect(screen.getByText("3+")).toBeInTheDocument();
        });
    });

    // ── 2. Category toggling ──────────────────────────────────────────────────

    describe("category filter", () => {
        it("adds a category when an unselected chip is clicked", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters();

            await user.click(screen.getByText("Beauty"));

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                categories: ["beauty"],
            });
        });

        it("removes a category when an already-selected chip is clicked", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters({ categories: ["beauty"] });

            await user.click(screen.getByText("Beauty"));

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                categories: [],
            });
        });

        it("can select multiple categories independently", async () => {
            const user = userEvent.setup();
            const onFilterChange = jest.fn();

            // First click – add "beauty"
            const { unmount } = render(
                <ProductFilters
                    availableCategories={mockAvailableCategories}
                    maxPrice={mockMaxPrice}
                    filters={defaultFilters}
                    onFilterChange={onFilterChange}
                />
            );

            await user.click(screen.getByText("Beauty"));
            expect(onFilterChange).toHaveBeenLastCalledWith({
                ...defaultFilters,
                categories: ["beauty"],
            });

            unmount();

            // Second click – add "skincare" alongside "beauty"
            render(
                <ProductFilters
                    availableCategories={mockAvailableCategories}
                    maxPrice={mockMaxPrice}
                    filters={{ ...defaultFilters, categories: ["beauty"] }}
                    onFilterChange={onFilterChange}
                />
            );

            await user.click(screen.getByText("Skincare"));
            expect(onFilterChange).toHaveBeenLastCalledWith({
                ...defaultFilters,
                categories: ["beauty", "skincare"],
            });
        });
    });

    // ── 3. Rating ─────────────────────────────────────────────────────────────

    describe("minimum rating filter", () => {


        it("calls onFilterChange with the selected rating", () => {
            const { onFilterChange } = renderFilters();

            fireEvent.change(screen.getByTestId("mock-rating"), { target: { value: "4" } });

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                minRating: 4,
            });
        });

        it("supports half-star precision (e.g. 3.5)", () => {
            const { onFilterChange } = renderFilters();

            fireEvent.change(screen.getByTestId("mock-rating"), { target: { value: "3.5" } });

            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                minRating: 3.5,
            });
        });

        it("reflects the current minRating value in the component", () => {
            renderFilters({ minRating: 4 });
            const ratingInput = screen.getByTestId("mock-rating") as HTMLInputElement;
            expect(Number(ratingInput.value)).toBe(4);
        });
    });

    // ── 4. Sort ───────────────────────────────────────────────────────────────

    describe("sort filter", () => {

        it("calls onFilterChange when sort option changes to price-asc", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters();

            // Open the dropdown by clicking the element showing the current value
            await user.click(screen.getByRole("combobox"));

            // Click the desired option in the portal/listbox
            await user.click(screen.getByRole("option", { name: /Price: Low → High/i }));

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                sortBy: "price-asc",
            });
        });

        it("calls onFilterChange when sort option changes to price-desc", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters();

            await user.click(screen.getByRole("combobox"));
            await user.click(screen.getByRole("option", { name: /Price: High → Low/i }));

            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                sortBy: "price-desc",
            });
        });

        it("calls onFilterChange when sort option changes to rating", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters();

            await user.click(screen.getByRole("combobox"));
            await user.click(screen.getByRole("option", { name: /Top Rated/i }));

            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                sortBy: "rating",
            });
        });

        it("calls onFilterChange when sort option changes to name-asc", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters();

            await user.click(screen.getByRole("combobox"));
            await user.click(screen.getByRole("option", { name: /Name: A → Z/i }));

            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                sortBy: "name-asc",
            });
        });

        it("reflects the current sortBy value in the select", () => {
            renderFilters({ sortBy: "price-asc" });
            // MUI Select displays the selected option's text as the combobox label
            expect(screen.getByRole("combobox")).toHaveTextContent(/Price: Low → High/i);
        });
    });

    // ── 5. Clear All ──────────────────────────────────────────────────────────

    describe("Clear All button", () => {
        const activeFilters: FilterState = {
            categories: ["beauty"],
            priceRange: [10, 50],
            minRating: 4,
            sortBy: "price-asc",
        };

        it("resets all filters to their defaults when clicked", async () => {
            const user = userEvent.setup();
            const { onFilterChange } = renderFilters(activeFilters);

            await user.click(screen.getByText(/Clear All/i));

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                categories: [],
                priceRange: [0, mockMaxPrice],
                minRating: 0,
                sortBy: "default",
            });
        });

        it("disappears after filters are cleared (hasActiveFilters = false)", () => {
            // Simulate the parent re-rendering with reset filters after Clear All
            const { rerender } = render(
                <ProductFilters
                    availableCategories={mockAvailableCategories}
                    maxPrice={mockMaxPrice}
                    filters={activeFilters}
                    onFilterChange={jest.fn()}
                />
            );

            expect(screen.getByText(/Clear All/i)).toBeInTheDocument();

            rerender(
                <ProductFilters
                    availableCategories={mockAvailableCategories}
                    maxPrice={mockMaxPrice}
                    filters={defaultFilters}
                    onFilterChange={jest.fn()}
                />
            );

            expect(screen.queryByText(/Clear All/i)).not.toBeInTheDocument();
        });
    });

    // ── 6. Price Range ────────────────────────────────────────────────────────

    describe("price range", () => {
        it("displays the current price range boundaries", () => {
            renderFilters({ priceRange: [20, 80] });

            expect(screen.getAllByText(/\$20/)[0]).toBeInTheDocument();
            expect(screen.getAllByText(/\$80/)[0]).toBeInTheDocument();
        });

        it("displays full range when filters are at defaults", () => {
            renderFilters();

            expect(screen.getAllByText(/\$0/)[0]).toBeInTheDocument();
            expect(screen.getAllByText(new RegExp(`\\$${mockMaxPrice}`))[0]).toBeInTheDocument();
        });
        it("calls onFilterChange when the slider upper bound changes", () => {
            const { onFilterChange } = renderFilters();

            fireEvent.change(screen.getByTestId("mock-slider"), { target: { value: "50" } });

            expect(onFilterChange).toHaveBeenCalledTimes(1);
            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                priceRange: [0, 50],
            });
        });

        it("preserves the lower bound when updating the upper bound", () => {
            const { onFilterChange } = renderFilters({ priceRange: [10, 100] });

            fireEvent.change(screen.getByTestId("mock-slider"), { target: { value: "70" } });

            expect(onFilterChange).toHaveBeenCalledWith({
                ...defaultFilters,
                priceRange: [10, 70],
            });
        });
    });
});
