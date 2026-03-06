"use client";

import { useRef } from "react";
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import IconButton from '@mui/material/IconButton';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';

import { Product } from "@/app/types/types";

export default function ItemsDisplay({ products }: { products: Product[] }) {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: direction === "left" ? -500 : 500,
                behavior: "smooth",
            });
        }
    };

    const ProductCard = ({ product }: { product: Product }) => (
        <Card sx={{
            borderRadius: "10px",
            height: "100%",
            position: "relative",
            overflow: "hidden",
            transition: "box-shadow 0.25s ease",
            "&:hover": {
                boxShadow: 8,
            },
            "&:hover .hover-overlay": {
                opacity: 1,
                transform: "translateY(0)",
            },
        }}>
            <CardActionArea sx={{ backgroundColor: "white", borderRadius: "10px", height: "100%" }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: "contain", p: 1, backgroundColor: "#f9f9f9" }}
                />

                <Box sx={{ px: 1.5, py: 1.25 }}>
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
                </Box>
            </CardActionArea>

            <Box
                className="hover-overlay"
                sx={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    bgcolor: "rgba(71, 71, 71, 0.88)",
                    backdropFilter: "blur(4px)",
                    color: "white",
                    px: 2,
                    py: 1.75,
                    opacity: 0,
                    transform: "translateY(12px)",
                    transition: "opacity 0.25s ease, transform 0.25s ease",
                    pointerEvents: "none",
                    borderRadius: "0 0 10px 10px",
                }}
            >
                <Typography
                    variant="caption"
                    sx={{
                        display: "inline-block",
                        bgcolor: "rgba(255,255,255,0.15)",
                        borderRadius: "4px",
                        px: 0.75,
                        py: 0.25,
                        mb: 0.75,
                        textTransform: "capitalize",
                        letterSpacing: "0.04em",
                    }}
                >
                    {product.category}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        lineHeight: 1.5,
                        color: "rgba(255,255,255,0.82)",
                        mb: 1,
                    }}
                >
                    {product.description}
                </Typography>

                {/* Rating row */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <StarIcon sx={{ fontSize: 14, color: "#FFD700" }} />
                    <Typography variant="caption" fontWeight={600}>
                        {product.rating.rate}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.55)" }}>
                        ({product.rating.count} reviews)
                    </Typography>
                </Box>
            </Box>
        </Card>
    );

    return (
        <>

            {/* Mobile */}
            <Box sx={{
                display: { xs: "grid", md: "none" },
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                px: 2,
                py: 2,
            }}>
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </Box>

            {/* ── DESKTOP*/}
            <Box sx={{
                display: { xs: "none", md: "flex" },
                alignItems: "center",
                position: "relative",
                px: 1,
                py: 2,
            }}>


                <Box

                    sx={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 2,
                        flex: 1,

                    }}
                >
                    {products.map((product) => (
                        <Box key={product.id} sx={{ minWidth: 220, maxWidth: 400, flexShrink: 0 }}>
                            <ProductCard product={product} />
                        </Box>
                    ))}
                </Box>


            </Box>
        </>
    );
}
