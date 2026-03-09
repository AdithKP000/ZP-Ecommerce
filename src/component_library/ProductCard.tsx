"use client";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import { ProductResponse } from "../types/ProductTypes";
import WishlistButton from "./WishlistButton";
import AddToCardButton from "./CardButton";
import Link from "next/link";


export function StarRow({ rating }: { rating: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            {[1, 2, 3, 4, 5].map((i) => {
                if (rating >= i) return <StarIcon key={i} sx={{ fontSize: 14, color: "#f5a623" }} />;
                if (rating >= i - 0.5) return <StarHalfIcon key={i} sx={{ fontSize: 14, color: "#f5a623" }} />;
                return <StarOutlineIcon key={i} sx={{ fontSize: 14, color: "#f5a623" }} />;
            })}
        </Box>
    );
}

export function ProductCard({ product }: { product: ProductResponse }) {
    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: "none", color: "inherit" }}>
            <Box
                sx={{
                    minWidth: 160,
                    maxWidth: 260,
                    flexShrink: 0,
                    cursor: "pointer",
                    "&:hover .card-img-wrap": {
                        boxShadow: "0 6px 20px rgba(0,0,0,0.10)",
                    },
                }}
            >
                <Box
                    className="card-img-wrap"
                    sx={{
                        position: "relative",
                        bgcolor: "#f5f5f5",
                        borderRadius: "14px",
                        overflow: "hidden",
                        aspectRatio: "1 / 1",
                        transition: "box-shadow 0.25s ease",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                >
                    {/* discount badge */}
                    {product.discountPercentage > 0 && (
                        <Box
                            sx={{
                                position: "absolute",
                                top: 10,
                                left: 10,
                                bgcolor: "#e53935",
                                color: "white",
                                borderRadius: "20px",
                                px: 1,
                                py: 0.25,
                                fontSize: "0.7rem",
                                fontWeight: 700,
                                lineHeight: 1.4,
                                zIndex: 2,
                            }}
                        >
                            -{Math.round(product.discountPercentage)}%
                        </Box>
                    )}

                    {/* wishlist and add to cart */}
                    <Box sx={{ position: "absolute", top: 8, right: 8, zIndex: 2 }}>
                        <Box sx={{ mb: 1 }}>
                            <WishlistButton product={product} />
                        </Box>
                        <Box>
                            <AddToCardButton product={product} />
                        </Box>
                    </Box>

                    {/* product image */}
                    <Box
                        component="img"
                        src={product.thumbnail}
                        alt={product.title}
                        sx={{
                            width: "75%",
                            height: "75%",
                            objectFit: "contain",
                            mixBlendMode: "multiply",
                        }}
                    />
                </Box>

                <Box sx={{ pt: 1.25, px: 0.5 }}>
                    {/* stars + review count */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mb: 0.5 }}>
                        <StarRow rating={product.rating} />
                        <Typography variant="caption" sx={{ color: "#666", fontSize: "0.7rem" }}>
                            - {product.reviews.length} reviews
                        </Typography>
                    </Box>

                    {/* category */}
                    <Typography
                        variant="caption"
                        sx={{
                            color: "#888",
                            fontSize: "0.68rem",
                            textTransform: "uppercase",
                            letterSpacing: "0.03em",
                            display: "block",
                            mb: 0.25,
                        }}
                    >
                        {product.category}
                    </Typography>

                    {/* title */}
                    <Typography
                        variant="body2"
                        fontWeight={700}
                        sx={{
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            overflow: "hidden",
                            lineHeight: 1.35,
                            fontSize: "0.82rem",
                            mb: 0.75,
                            color: "#111",
                        }}
                    >
                        {product.title}
                    </Typography>

                    {/* price */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        <Typography variant="body2" fontWeight={700} sx={{ fontSize: "0.88rem" }}>
                            ${product.price.toFixed(2)}
                        </Typography>
                    </Box>
                </Box>
            </Box>
        </Link>
    );
}
