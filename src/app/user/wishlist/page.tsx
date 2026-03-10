"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import Link from "next/link";

import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { useAppDispatch, useAppSelector } from "@/core_components/hooks/redux";
import { removeFomWishList } from "@/core_components/state/slices/wishlistSlice";
import { addToCart } from "@/core_components/state/slices/cartSlice";
import { ProductResponse } from "@/types/ProductTypes";

// ---------- Empty State ----------
function EmptyWishlist() {
    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "60vh",
                gap: 2,
                px: 3,
                textAlign: "center",
            }}
        >
            <Box
                sx={{
                    width: 80,
                    height: 80,
                    borderRadius: "50%",
                    bgcolor: "#fff0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                }}
            >
                <FavoriteIcon sx={{ fontSize: 40, color: "#e53935" }} />
            </Box>
            <Typography variant="h5" fontWeight={700} color="#111">
                Your wishlist is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
                Save items you love by tapping the ♥ on any product. They&apos;ll appear here.
            </Typography>
            <Link href="/products/allProducts" style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    sx={{
                        mt: 1,
                        bgcolor: "#111",
                        borderRadius: "10px",
                        px: 4,
                        py: 1.25,
                        textTransform: "none",
                        fontWeight: 600,
                        "&:hover": { bgcolor: "#333" },
                    }}
                >
                    Browse Products
                </Button>
            </Link>
        </Box>
    );
}

// ---------- Single Wishlist Card ----------
function WishlistCard({ product }: { product: ProductResponse }) {
    const dispatch = useAppDispatch();

    const discountedPrice = product.discountPercentage
        ? (product.price * (1 - product.discountPercentage / 100)).toFixed(2)
        : null;

    const handleAddToCart = () => {
        dispatch(addToCart(product));
    };

    const handleRemove = () => {
        dispatch(removeFomWishList(product.id));
    };

    return (
        <Box
            sx={{
                display: "flex",
                gap: 2,
                p: 2,
                borderRadius: "14px",
                bgcolor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                alignItems: "center",
                transition: "box-shadow 0.2s ease",
                "&:hover": {
                    boxShadow: "0 4px 20px rgba(0,0,0,0.10)",
                },
            }}
        >
            {/* Product image */}
            <Box
                sx={{
                    flexShrink: 0,
                    width: { xs: 80, sm: 110 },
                    height: { xs: 80, sm: 110 },
                    borderRadius: "10px",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Box
                    component="img"
                    src={product.thumbnail}
                    alt={product.title}
                    sx={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }}
                />
            </Box>

            {/* Info */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="caption"
                    sx={{ color: "#888", textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.04em" }}
                >
                    {product.category}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                        fontSize: { xs: "0.85rem", sm: "0.95rem" },
                        color: "#111",
                        mt: 0.25,
                        mb: 0.5,
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                    }}
                >
                    {product.title}
                </Typography>

                {/* Price */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1.5 }}>
                    {discountedPrice ? (
                        <>
                            <Typography variant="body2" fontWeight={700} sx={{ color: "#e53935", fontSize: "0.95rem" }}>
                                ${discountedPrice}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ textDecoration: "line-through", color: "#aaa", fontSize: "0.8rem" }}
                            >
                                ${product.price.toFixed(2)}
                            </Typography>
                            <Box
                                sx={{
                                    bgcolor: "#fff0f0",
                                    color: "#e53935",
                                    borderRadius: "6px",
                                    px: 0.75,
                                    py: 0.1,
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                }}
                            >
                                -{Math.round(product.discountPercentage)}%
                            </Box>
                        </>
                    ) : (
                        <Typography variant="body2" fontWeight={700} sx={{ fontSize: "0.95rem" }}>
                            ${product.price.toFixed(2)}
                        </Typography>
                    )}
                </Box>

                {/* Actions */}
                <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCartOutlinedIcon sx={{ fontSize: 16 }} />}
                        onClick={handleAddToCart}
                        sx={{
                            bgcolor: "#111",
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            px: 2,
                            "&:hover": { bgcolor: "#333" },
                        }}
                    >
                        Add to Cart
                    </Button>
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<ShoppingBagOutlinedIcon sx={{ fontSize: 16 }} />}
                        sx={{
                            borderRadius: "8px",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "0.78rem",
                            px: 2,
                            borderColor: "#111",
                            color: "#111",
                            "&:hover": { bgcolor: "#f5f5f5", borderColor: "#111" },
                        }}
                    >
                        Buy Now
                    </Button>
                </Box>
            </Box>

            {/* Remove from wishlist */}
            <IconButton
                onClick={handleRemove}
                size="small"
                sx={{
                    alignSelf: "flex-start",
                    color: "#bbb",
                    "&:hover": { color: "#e53935", bgcolor: "#fff0f0" },
                }}
            >
                <DeleteOutlineIcon fontSize="small" />
            </IconButton>
        </Box>
    );
}

// ---------- Page ----------
export default function WishlistPage() {
    const dispatch = useAppDispatch();
    const items = useAppSelector((state) => state.wishlist.items);

    const handleAddAllToCart = () => {
        items.forEach((item) => dispatch(addToCart(item)));
    };

    return (
        <Box sx={{ maxWidth: 720, mx: "auto", px: { xs: 2, sm: 3 }, py: 4 }}>
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
                <Link href="/products" style={{ color: "inherit", display: "flex" }}>
                    <IconButton size="small" sx={{ color: "#555" }}>
                        <ArrowBackIcon fontSize="small" />
                    </IconButton>
                </Link>
                <Typography variant="h5" fontWeight={800} color="#111">
                    My Wishlist
                </Typography>
                {items.length > 0 && (
                    <Box
                        sx={{
                            ml: 1,
                            bgcolor: "#111",
                            color: "white",
                            borderRadius: "20px",
                            px: 1.25,
                            py: 0.2,
                            fontSize: "0.75rem",
                            fontWeight: 700,
                        }}
                    >
                        {items.length}
                    </Box>
                )}
            </Box>

            {items.length === 0 ? (
                <EmptyWishlist />
            ) : (
                <>
                    {/* Add all to cart */}
                    <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
                        <Button
                            variant="outlined"
                            startIcon={<ShoppingCartOutlinedIcon />}
                            onClick={handleAddAllToCart}
                            sx={{
                                borderRadius: "10px",
                                textTransform: "none",
                                fontWeight: 600,
                                fontSize: "0.82rem",
                                borderColor: "#111",
                                color: "#111",
                                "&:hover": { bgcolor: "#f5f5f5", borderColor: "#111" },
                            }}
                        >
                            Add All to Cart
                        </Button>
                    </Box>

                    <Divider sx={{ mb: 2 }} />

                    {/* Items list */}
                    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        {items.map((product) => (
                            <WishlistCard key={product.id} product={product} />
                        ))}
                    </Box>
                </>
            )}
        </Box>
    );
}