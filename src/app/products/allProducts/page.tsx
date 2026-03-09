import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAllProducts, getProductsByCategory } from "@/core_components/api/productData";
import { ProductCard } from "../../../component_library/ProductCard";
// Friendly display names for each slug
const CATEGORY_LABELS: Record<string, string> = {
    "beauty": "Beauty",
    "fragrances": "Fragrances",
    "furniture": "Furniture",
}

interface Props {
    searchParams: Promise<{ category?: string }>
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

    return (
        <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                {pageTitle} ({products.length})
            </Typography>

            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "1fr 1fr 1fr",
                    md: "1fr 1fr 1fr 1fr",
                },
                gap: 1,
                pl: 2,
                pr: 2,
            }}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>
        </Box>
    );
}
