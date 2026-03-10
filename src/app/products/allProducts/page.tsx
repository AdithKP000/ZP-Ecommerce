import { getAllProducts, getProductsByCategory } from "@/core_components/api/productData";
import FilteredProductsView from "./FilteredProductsView";

// Friendly display names for each slug
const CATEGORY_LABELS: Record<string, string> = {
    "beauty": "Beauty",
    "fragrances": "Fragrances",
    "furniture": "Furniture",
};

interface Props {
    searchParams: Promise<{ category?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {
    const { category: categorySlug } = await searchParams;

    // If a category slug is in the URL, fetch just that category.
    // Otherwise fetch everything.
    const products = categorySlug
        ? await getProductsByCategory(categorySlug)
        : await getAllProducts();

    const pageTitle = categorySlug
        ? CATEGORY_LABELS[categorySlug] ?? "Products"
        : "All Products";

    // Derive filter metadata from fetched products
    const availableCategories = [...new Set(products.map((p) => p.category))];
    const maxPrice = Math.ceil(Math.max(...products.map((p) => p.price), 0));

    return (
        <FilteredProductsView
            products={products}
            availableCategories={availableCategories}
            maxPrice={maxPrice}
            pageTitle={pageTitle}
        />
    );
}
