import { getAllProducts, getProductsByCategory, searchProducts } from "@/core_components/api/productData";
import FilteredProductsView from "./FilteredProductsView";

// Friendly display names for each slug
const CATEGORY_LABELS: Record<string, string> = {
    "beauty": "Beauty",
    "fragrances": "Fragrances",
    "furniture": "Furniture",
};

interface Props {
    searchParams: Promise<{ category?: string; search?: string }>;
}

export default async function ProductsPage({ searchParams }: Props) {

    const { category: categorySlug, search: searchQuery } = await searchParams;

    // Priority: search > category > all
    const products = searchQuery
        ? await searchProducts(searchQuery)
        : categorySlug
            ? await getProductsByCategory(categorySlug)
            : await getAllProducts();

    const pageTitle = searchQuery
        ? `Results for "${searchQuery}"`
        : categorySlug
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
