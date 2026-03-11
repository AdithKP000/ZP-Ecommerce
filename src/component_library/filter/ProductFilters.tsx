"use client";

import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";
import Slider from "@mui/material/Slider";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import Divider from "@mui/material/Divider";

export type SortOption = "default" | "price-asc" | "price-desc" | "rating" | "name-asc";

export interface FilterState {
    categories: string[];
    priceRange: [number, number];
    minRating: number;
    sortBy: SortOption;
}

interface ProductFiltersProps {
    availableCategories: string[];
    maxPrice: number;
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

export default function ProductFilters({
    availableCategories,
    maxPrice,
    filters,
    onFilterChange,
}: ProductFiltersProps) {

    const handleCategoryToggle = (category: string) => {
        const updated = filters.categories.includes(category)
            ? filters.categories.filter((c) => c !== category)
            : [...filters.categories, category];
        onFilterChange({ ...filters, categories: updated });
    };

    const handlePriceChange = (_: Event, value: number | number[]) => {
        onFilterChange({ ...filters, priceRange: value as [number, number] });
    };

    const handleRatingChange = (_: React.SyntheticEvent, value: number | null) => {
        onFilterChange({ ...filters, minRating: value ?? 0 });
    };

    const handleSortChange = (e: SelectChangeEvent) => {
        onFilterChange({ ...filters, sortBy: e.target.value as SortOption });
    };

    const handleClearAll = () => {
        onFilterChange({
            categories: [],
            priceRange: [0, maxPrice],
            minRating: 0,
            sortBy: "default",
        });
    };

    const hasActiveFilters =
        filters.categories.length > 0 ||
        filters.priceRange[0] > 0 ||
        filters.priceRange[1] < maxPrice ||
        filters.minRating > 0 ||
        filters.sortBy !== "default";

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                gap: 3,
                p: 3,
                backgroundColor: "#fafafa",
                borderRadius: "14px",
                border: "1px solid #eee",
                position: "sticky",
                top: 80,
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <Typography variant="h6" fontWeight={700} sx={{ fontSize: "1rem" }}>
                    Filters
                </Typography>
                {hasActiveFilters && (
                    <Button
                        size="small"
                        onClick={handleClearAll}
                        sx={{
                            textTransform: "none",
                            color: "#e53935",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                        }}
                    >
                        Clear All
                    </Button>
                )}
            </Box>

            <Divider />

            {/* Sort By */}
            <Box>
                <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: "block", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Sort By
                </Typography>
                <FormControl fullWidth size="small">
                    <Select
                        value={filters.sortBy}
                        onChange={handleSortChange}
                        sx={{
                            borderRadius: "8px",
                            backgroundColor: "#fff",
                            fontSize: "0.85rem",
                        }}
                    >
                        <MenuItem value="default">Default</MenuItem>
                        <MenuItem value="price-asc">Price: Low → High</MenuItem>
                        <MenuItem value="price-desc">Price: High → Low</MenuItem>
                        <MenuItem value="rating">Top Rated</MenuItem>
                        <MenuItem value="name-asc">Name: A → Z</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <Divider />

            {/* Category */}
            <Box>
                <Typography variant="caption" fontWeight={700} sx={{ mb: 1.5, display: "block", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Category
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {availableCategories.map((cat) => (
                        <Chip
                            key={cat}
                            label={cat.charAt(0).toUpperCase() + cat.slice(1)}
                            size="small"
                            onClick={() => handleCategoryToggle(cat)}
                            variant={filters.categories.includes(cat) ? "filled" : "outlined"}
                            sx={{
                                borderRadius: "8px",
                                fontWeight: 600,
                                fontSize: "0.78rem",
                                ...(filters.categories.includes(cat)
                                    ? {
                                        backgroundColor: "#111",
                                        color: "#fff",
                                        "&:hover": { backgroundColor: "#333" },
                                    }
                                    : {
                                        borderColor: "#ccc",
                                        color: "#555",
                                        "&:hover": { backgroundColor: "#f0f0f0" },
                                    }),
                            }}
                        />
                    ))}
                </Box>
            </Box>

            <Divider />

            {/* Price Range */}
            <Box>
                <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: "block", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Price Range
                </Typography>
                <Box sx={{ px: 1 }}>
                    <Slider
                        value={filters.priceRange}
                        onChange={handlePriceChange}
                        valueLabelDisplay="auto"
                        min={0}
                        max={maxPrice}
                        valueLabelFormat={(v) => `$${v}`}
                        sx={{
                            color: "#111",
                            "& .MuiSlider-thumb": {
                                width: 16,
                                height: 16,
                                backgroundColor: "#fff",
                                border: "2px solid #111",
                            },
                        }}
                    />
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="caption" sx={{ color: "#888" }}>
                        ${filters.priceRange[0]}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#888" }}>
                        ${filters.priceRange[1]}
                    </Typography>
                </Box>
            </Box>

            <Divider />

            {/* Minimum Rating */}
            <Box>
                <Typography variant="caption" fontWeight={700} sx={{ mb: 1, display: "block", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                    Minimum Rating
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Rating
                        value={filters.minRating}
                        onChange={handleRatingChange}
                        precision={0.5}
                        size="medium"
                        sx={{
                            "& .MuiRating-iconFilled": { color: "#f5a623" },
                        }}
                    />
                    <Typography variant="caption" sx={{ color: "#888", fontSize: "0.78rem" }}>
                        {filters.minRating > 0 ? `${filters.minRating}+` : "Any"}
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
}
