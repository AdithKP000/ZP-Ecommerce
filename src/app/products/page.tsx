import ItemsDisplay from "@/component_library/Items-display";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { getAllProducts } from "@/core_components/api/productData";
import { Product } from "../types/types";

export default async function ProductsPage() {
    const products: Product[] = await getAllProducts();

    return (
        <Box sx={{ px: 2, py: 3 }}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 2 }}>
                All Products ({products.length})
            </Typography>

            {/* On this page, show all products in a wrapping grid */}
            <Box sx={{
                display: "grid",
                gridTemplateColumns: {
                    xs: "1fr 1fr",
                    sm: "1fr 1fr 1fr",
                    md: "1fr 1fr 1fr 1fr",
                },
                gap: 2,
            }}>
                {products.map((product) => (
                    <Box key={product.id} sx={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        boxShadow: 1,
                        bgcolor: "white",
                        display: "flex",
                        flexDirection: "column",
                    }}>
                        <Box sx={{
                            height: 200,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: "#f9f9f9",
                            p: 1,
                        }}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src={product.image}
                                alt={product.title}
                                style={{ maxHeight: "100%", maxWidth: "100%", objectFit: "contain" }}
                            />
                        </Box>
                        <Box sx={{ p: 1.5 }}>
                            <Typography
                                variant="body2"
                                fontWeight={600}
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    mb: 0.5,
                                }}
                            >
                                {product.title}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                ${product.price}
                            </Typography>
                            <Typography variant="caption" color="text.disabled" sx={{ textTransform: "capitalize" }}>
                                {product.category}
                            </Typography>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
