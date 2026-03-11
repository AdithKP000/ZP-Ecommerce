import { notFound } from "next/navigation";
import { getProductById, getProductsByCategory } from "@/core_components/api/productData";
import ProductDetailClient from "./ProductDetailClient";
import ItemsDisplay from "@/component_library/items-display/Items-display";
import { Box, Typography } from "@mui/material";

interface Props {
    params: Promise<{ id: string }>;
}

export default async function ProductDetailPage({ params }: Props) {

    const { id } = await params;
    const product = await getProductById(Number(id));

    if (!product) return notFound();
    const similarProducts = await getProductsByCategory(product.category)
    const displayProducts = similarProducts.filter((p) => p.id !== product.id).slice(0, 4);
    return (
        <>
            <ProductDetailClient product={product} />
            <Box sx={{ m: 4, alignItems: "center", justifyContent: "center", display: "flex", flexDirection: "column" }}>
                <Typography variant="h4" sx={{ m: 2 }}>Similar Products</Typography>
                <ItemsDisplay products={displayProducts} />
            </Box>
        </>

    );

}