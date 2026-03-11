"use client";

import React, { useState, useMemo } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import FilterListIcon from "@mui/icons-material/FilterList";
import { ProductResponse } from "@/types/ProductTypes";
import { ProductCard } from "@/component_library/productcard/ProductCard";
import ProductFilters, { FilterState, SortOption } from "@/component_library/filter/ProductFilters";

interface Props {
    products: ProductResponse[];
    availableCategories: string[];
    maxPrice: number;
    pageTitle: string;
}

function applyFilters(products: ProductResponse[], filters: FilterState): ProductResponse[] {
    let result = [...products];

    // Category filter
    if (filters.categories.length > 0) {
        result = result.filter((p) => filters.categories.includes(p.category));
    }

    // Price range filter (uses discounted price if available)
    result = result.filter((p) => {
        const effectivePrice = p.discountPercentage
            ? p.price * (1 - p.discountPercentage / 100)
            : p.price;
        return effectivePrice >= filters.priceRange[0] && effectivePrice <= filters.priceRange[1];
    });

    // Minimum rating filter
    if (filters.minRating > 0) {
        result = result.filter((p) => p.rating >= filters.minRating);
    }

    return result;
}

function applySorting(products: ProductResponse[], sortBy: SortOption): ProductResponse[] {
    const sorted = [...products];
    switch (sortBy) {
        case "price-asc":
            return sorted.sort((a, b) => a.price - b.price);
        case "price-desc":
            return sorted.sort((a, b) => b.price - a.price);
        case "rating":
            return sorted.sort((a, b) => b.rating - a.rating);
        case "name-asc":
            return sorted.sort((a, b) => a.title.localeCompare(b.title));
        default:
            return sorted;
    }
}

export default function FilteredProductsView({
    products,
    availableCategories,
    maxPrice,
    pageTitle,
}: Props) {
    const [filters, setFilters] = useState<FilterState>({
        categories: [],
        priceRange: [0, maxPrice],
        minRating: 0,
        sortBy: "default",
    });

    const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

    const filteredProducts = useMemo(() => {
        const filtered = applyFilters(products, filters);
        return applySorting(filtered, filters.sortBy);
    }, [products, filters]);

    const filterPanel = (
        <ProductFilters
            availableCategories={availableCategories}
            maxPrice={maxPrice}
            filters={filters}
            onFilterChange={setFilters}
        />
    );

    return (
        <Box sx={{ px: { xs: 2, md: 4 }, py: 3 }}>
            {/* Page header */}
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <Typography variant="h5" fontWeight={700}>
                    {pageTitle}{" "}
                    <Typography component="span" variant="body1" sx={{ color: "#888", fontWeight: 400 }}>
                        ({filteredProducts.length} products)
                    </Typography>
                </Typography>

                {/* Mobile filter toggle */}
                <IconButton
                    onClick={() => setMobileFilterOpen(true)}
                    sx={{
                        display: { xs: "flex", md: "none" },
                        border: "1px solid #ddd",
                        borderRadius: "10px",
                        px: 2,
                        gap: 0.5,
                    }}
                >
                    <FilterListIcon sx={{ fontSize: 20 }} />
                    <Typography variant="caption" fontWeight={600}>
                        Filters
                    </Typography>
                </IconButton>
            </Box>

            <Box sx={{ display: "flex", gap: 3 }}>
                {/* Desktop sidebar */}
                <Box
                    sx={{
                        display: { xs: "none", md: "block" },
                        width: 280,
                        flexShrink: 0,
                    }}
                >
                    {filterPanel}
                </Box>

                {/* Mobile drawer */}
                <Drawer
                    anchor="left"
                    open={mobileFilterOpen}
                    onClose={() => setMobileFilterOpen(false)}
                    PaperProps={{
                        sx: { width: 300, p: 2, pt: 4 },
                    }}
                >
                    {filterPanel}
                </Drawer>

                {/* Product grid */}
                <Box sx={{ flex: 1, minWidth: 0 }}>
                    {filteredProducts.length === 0 ? (
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            py: 10,
                            color: "#999",
                        }}>
                            <Typography variant="h6" fontWeight={600} sx={{ mb: 1 }}>
                                No products found
                            </Typography>
                            <Typography variant="body2">
                                Try adjusting your filters to find what you're looking for.
                            </Typography>
                        </Box>
                    ) : (
                        <Box
                            sx={{
                                display: "grid",
                                gridTemplateColumns: {
                                    xs: "1fr 1fr",
                                    sm: "1fr 1fr 1fr",
                                    md: "1fr 1fr 1fr",
                                    lg: "1fr 1fr 1fr 1fr",
                                },
                                gap: 2,
                            }}
                        >
                            {filteredProducts.map((product) => (
                                <ProductCard key={product.id} product={product} />
                            ))}
                        </Box>
                    )}
                </Box>
            </Box>
        </Box>
    );
}
