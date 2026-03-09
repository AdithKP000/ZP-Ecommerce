"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Avatar from "@mui/material/Avatar";

import StarIcon from "@mui/icons-material/Star";
import StarHalfIcon from "@mui/icons-material/StarHalf";
import StarOutlineIcon from "@mui/icons-material/StarOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import HomeIcon from "@mui/icons-material/Home";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Link from "next/link";

import { useAppDispatch, useAppSelector } from "@/core_components/hooks/redux";
import { addToCart, incrementQuantity } from "@/core_components/state/slices/cartSlice";
import WishlistButton from "@/component_library/WishlistButton";
import { ProductResponse } from "@/types/ProductTypes";

// ── Star row ─────────────────────────────────────────────────────────────────
function StarRow({ rating, size = 18 }: { rating: number; size?: number }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.25 }}>
            {[1, 2, 3, 4, 5].map((i) => {
                if (rating >= i) return <StarIcon key={i} sx={{ fontSize: size, color: "#f5a623" }} />;
                if (rating >= i - 0.5) return <StarHalfIcon key={i} sx={{ fontSize: size, color: "#f5a623" }} />;
                return <StarOutlineIcon key={i} sx={{ fontSize: size, color: "#f5a623" }} />;
            })}
        </Box>
    );
}

// ── Breadcrumb ────────────────────────────────────────────────────────────────
function Breadcrumb({ category, title }: { category: string; title: string }) {
    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, flexWrap: "wrap", mb: 3 }}>
            <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center" }}>
                <HomeIcon sx={{ fontSize: 16, color: "#888" }} />
            </Link>
            <ChevronRightIcon sx={{ fontSize: 14, color: "#bbb" }} />
            <Link href="/products/allProducts" style={{ textDecoration: "none" }}>
                <Typography variant="caption" sx={{ color: "#888", "&:hover": { color: "#111" } }}>
                    Products
                </Typography>
            </Link>
            <ChevronRightIcon sx={{ fontSize: 14, color: "#bbb" }} />
            <Link href={`/products/allProducts?category=${category}`} style={{ textDecoration: "none" }}>
                <Typography variant="caption" sx={{ color: "#888", textTransform: "capitalize", "&:hover": { color: "#111" } }}>
                    {category}
                </Typography>
            </Link>
            <ChevronRightIcon sx={{ fontSize: 14, color: "#bbb" }} />
            <Typography
                variant="caption"
                sx={{
                    color: "#333",
                    fontWeight: 600,
                    maxWidth: { xs: 160, sm: 300 },
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    textOverflow: "ellipsis",
                }}
            >
                {title}
            </Typography>
        </Box>
    );
}

// ── Image Gallery ─────────────────────────────────────────────────────────────
function ImageGallery({ images, title, discountPercentage }: { images: string[]; title: string; discountPercentage: number }) {
    const [selected, setSelected] = useState(0);
    const validImages = images.length > 0 ? images : ["/placeholder.png"];

    return (
        <Box>
            {/* Main Image */}
            <Box
                sx={{
                    position: "relative",
                    bgcolor: "#f5f5f5",
                    borderRadius: "18px",
                    overflow: "hidden",
                    aspectRatio: "1 / 1",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 2,
                }}
            >
                {discountPercentage > 0 && (
                    <Box
                        sx={{
                            position: "absolute",
                            top: 14,
                            left: 14,
                            bgcolor: "#e53935",
                            color: "white",
                            borderRadius: "20px",
                            px: 1.25,
                            py: 0.3,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            zIndex: 2,
                        }}
                    >
                        -{Math.round(discountPercentage)}%
                    </Box>
                )}
                <Box
                    component="img"
                    src={validImages[selected]}
                    alt={title}
                    sx={{
                        width: "75%",
                        height: "75%",
                        objectFit: "contain",
                        mixBlendMode: "multiply",
                        transition: "opacity 0.2s ease",
                    }}
                />
            </Box>

            {/* Thumbnails */}
            {validImages.length > 1 && (
                <Box sx={{ display: "flex", gap: 1.25, flexWrap: "wrap" }}>
                    {validImages.map((img, i) => (
                        <Box
                            key={i}
                            onClick={() => setSelected(i)}
                            sx={{
                                width: { xs: 60, sm: 72 },
                                height: { xs: 60, sm: 72 },
                                borderRadius: "10px",
                                overflow: "hidden",
                                bgcolor: "#f5f5f5",
                                cursor: "pointer",
                                border: selected === i ? "2px solid #E8651C" : "2px solid transparent",
                                transition: "border-color 0.15s ease",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                "&:hover": { borderColor: "#E8651C" },
                            }}
                        >
                            <Box
                                component="img"
                                src={img}
                                alt={`${title} ${i + 1}`}
                                sx={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }}
                            />
                        </Box>
                    ))}
                </Box>
            )}
        </Box>
    );
}

// ── Review Card ───────────────────────────────────────────────────────────────
function ReviewCard({ review }: { review: ProductResponse["reviews"][number] }) {
    const initials = review.reviewerName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    return (
        <Box
            sx={{
                p: 2,
                borderRadius: "14px",
                bgcolor: "white",
                boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 1 }}>
                <Avatar
                    sx={{
                        width: 38,
                        height: 38,
                        bgcolor: "#E8651C",
                        fontSize: "0.8rem",
                        fontWeight: 700,
                    }}
                >
                    {initials}
                </Avatar>
                <Box sx={{ flex: 1 }}>
                    <Typography fontWeight={700} fontSize="0.88rem" color="#111">
                        {review.reviewerName}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                        {new Date(review.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                    </Typography>
                </Box>
                <StarRow rating={review.rating} size={14} />
            </Box>
            <Typography variant="body2" color="#444" lineHeight={1.6}>
                {review.comment}
            </Typography>
        </Box>
    );
}

// ── Main Client Component ─────────────────────────────────────────────────────
export default function ProductDetailClient({ product }: { product: ProductResponse }) {
    const dispatch = useAppDispatch();
    const [qty, setQty] = useState(1);

    const inCart = useAppSelector((state) =>
        state.cart.items.some((item) => item.product.id === product.id)
    );

    const discountedPrice = product.discountPercentage
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    const handleAddToCart = () => {
        // Add once then increment for additional qty
        dispatch(addToCart(product));
        for (let i = 1; i < qty; i++) {
            dispatch(incrementQuantity(product.id));
        }
    };

    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: "auto",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 2, sm: 3 },
                minHeight: "100vh",
                bgcolor: "#f7f7f8",
            }}
        >
            <Breadcrumb category={product.category} title={product.title} />

            {/* ── Main 2-col grid ── */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                    gap: { xs: 3, md: 5 },
                    alignItems: "start",
                    mb: 5,
                }}
            >
                {/* LEFT: Gallery */}
                <ImageGallery
                    images={product.images}
                    title={product.title}
                    discountPercentage={product.discountPercentage}
                />

                {/* RIGHT: Details */}
                <Box>
                    {/* Brand + Wishlist row */}
                    <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", mb: 0.5 }}>
                        <Typography
                            variant="overline"
                            sx={{ color: "#888", letterSpacing: "0.08em", fontWeight: 700, lineHeight: 1 }}
                        >
                            {product.brand ?? product.category}
                        </Typography>
                        <WishlistButton product={product} iconSize={20} buttonSize={38} />
                    </Box>

                    {/* Title */}
                    <Typography
                        variant="h5"
                        fontWeight={800}
                        color="#111"
                        sx={{ lineHeight: 1.25, mb: 1.25 }}
                    >
                        {product.title}
                    </Typography>

                    {/* Stars + review count */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                        <StarRow rating={product.rating} />
                        <Typography variant="body2" color="text.secondary">
                            {product.rating.toFixed(1)} — {product.reviews.length} reviews
                        </Typography>
                    </Box>

                    {/* Price */}
                    <Box sx={{ display: "flex", alignItems: "baseline", gap: 1.5, mb: 0.5 }}>
                        <Typography
                            sx={{ fontSize: "1.75rem", fontWeight: 800, color: discountedPrice ? "#E8651C" : "#111" }}
                        >
                            ${discountedPrice ?? product.price.toFixed(2)}
                        </Typography>
                        {discountedPrice && (
                            <Typography
                                sx={{ fontSize: "1rem", color: "#aaa", textDecoration: "line-through" }}
                            >
                                ${product.price.toFixed(2)}
                            </Typography>
                        )}
                    </Box>

                    {/* Availability + shipping */}
                    <Typography variant="caption" sx={{ color: "#2e7d32", fontWeight: 600, display: "block", mb: 2 }}>
                        {product.availabilityStatus} · {product.shippingInformation}
                    </Typography>

                    {/* Tags */}
                    {product.tags.length > 0 && (
                        <Box sx={{ display: "flex", gap: 0.75, flexWrap: "wrap", mb: 2.5 }}>
                            {product.tags.map((tag) => (
                                <Chip
                                    key={tag}
                                    label={tag}
                                    size="small"
                                    sx={{
                                        bgcolor: "#f0f0f0",
                                        fontSize: "0.7rem",
                                        fontWeight: 600,
                                        borderRadius: "6px",
                                        color: "#555",
                                    }}
                                />
                            ))}
                        </Box>
                    )}

                    {/* Description */}
                    <Typography variant="body2" color="#555" lineHeight={1.7} sx={{ mb: 3 }}>
                        {product.description}
                    </Typography>

                    <Divider sx={{ mb: 3 }} />

                    {/* Qty + Add to Cart */}
                    <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2, flexWrap: "wrap" }}>
                        {/* Quantity selector */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                border: "1.5px solid #e0e0e0",
                                borderRadius: "10px",
                                overflow: "hidden",
                            }}
                        >
                            <IconButton
                                size="small"
                                onClick={() => setQty((q) => Math.max(1, q - 1))}
                                sx={{ px: 1.5, borderRadius: 0, color: "#555" }}
                            >
                                <RemoveIcon fontSize="small" />
                            </IconButton>
                            <Typography
                                sx={{ minWidth: 36, textAlign: "center", fontWeight: 700, fontSize: "0.95rem" }}
                            >
                                {qty}
                            </Typography>
                            <IconButton
                                size="small"
                                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
                                sx={{ px: 1.5, borderRadius: 0, color: "#555" }}
                            >
                                <AddIcon fontSize="small" />
                            </IconButton>
                        </Box>

                        {/* Add to Cart */}
                        <Button
                            variant="contained"
                            startIcon={<ShoppingCartOutlinedIcon />}
                            onClick={handleAddToCart}
                            disabled={inCart}
                            sx={{
                                flex: 1,
                                bgcolor: "#111",
                                borderRadius: "12px",
                                py: 1.4,
                                fontWeight: 700,
                                textTransform: "none",
                                fontSize: "0.95rem",
                                boxShadow: "none",
                                "&:hover": { bgcolor: "#333", boxShadow: "none" },
                                "&.Mui-disabled": { bgcolor: "#555", color: "white", opacity: 0.7 },
                            }}
                        >
                            {inCart ? "Added to Cart" : "Add to Cart"}
                        </Button>
                    </Box>

                    {/* Buy Now */}
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderRadius: "12px",
                            py: 1.4,
                            fontWeight: 700,
                            textTransform: "none",
                            fontSize: "0.95rem",
                            borderColor: "#E8651C",
                            color: "#E8651C",
                            "&:hover": { bgcolor: "#fff5ee", borderColor: "#E8651C" },
                            mb: 3,
                        }}
                    >
                        Buy Now
                    </Button>

                    {/* Accordion: extra info */}
                    {[
                        { label: "Composition / Details", content: `SKU: ${product.sku} · Weight: ${product.weight}g · Dimensions: ${product.dimensions.width}×${product.dimensions.height}×${product.dimensions.depth} cm` },
                        { label: "Warranty & Returns", content: `${product.warrantyInformation} · ${product.returnPolicy}` },
                    ].map(({ label, content }) => (
                        <Accordion
                            key={label}
                            disableGutters
                            elevation={0}
                            sx={{
                                border: "none",
                                borderTop: "1px solid #eee",
                                bgcolor: "transparent",
                                "&::before": { display: "none" },
                            }}
                        >
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon sx={{ color: "#888" }} />}
                                sx={{ px: 0, "& .MuiAccordionSummary-content": { my: 1.25 } }}
                            >
                                <Typography fontWeight={700} fontSize="0.9rem" color="#111">
                                    {label}
                                </Typography>
                            </AccordionSummary>
                            <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                                <Typography variant="body2" color="#666" lineHeight={1.7}>
                                    {content}
                                </Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Box>

            {/* ── Reviews Section ── */}
            <Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3 }}>
                    <Typography variant="h6" fontWeight={800} color="#111">
                        Customer Reviews
                    </Typography>
                    <Box
                        sx={{
                            bgcolor: "#111",
                            color: "white",
                            borderRadius: "20px",
                            px: 1.4,
                            py: 0.25,
                            fontSize: "0.78rem",
                            fontWeight: 700,
                        }}
                    >
                        {product.reviews.length}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <StarRow rating={product.rating} size={16} />
                        <Typography variant="body2" fontWeight={700} color="#f5a623" sx={{ ml: 0.5 }}>
                            {product.rating.toFixed(1)}
                        </Typography>
                    </Box>
                </Box>

                {product.reviews.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        No reviews yet.
                    </Typography>
                ) : (
                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", lg: "1fr 1fr 1fr" },
                            gap: 2,
                        }}
                    >
                        {product.reviews.map((review, i) => (
                            <ReviewCard key={i} review={review} />
                        ))}
                    </Box>
                )}
            </Box>
        </Box>
    );
}
