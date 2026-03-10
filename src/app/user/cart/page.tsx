"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Divider from "@mui/material/Divider";
import Link from "next/link";

import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAppDispatch, useAppSelector } from "@/core_components/hooks/redux";
import {
    clearCart,
    decrementQuantity,
    incrementQuantity,
    removeFromCart,
} from "@/core_components/state/slices/cartSlice";
import { ProductResponse } from "@/types/ProductTypes";
import { useState } from "react";

// ----- helpers -----
function effectivePrice(product: ProductResponse | undefined): number {
    if (!product) return 0;
    return product.discountPercentage
        ? product.price * (1 - product.discountPercentage / 100)
        : product.price;
}

// ----- Empty State -----
function EmptyCart() {
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
                    width: 90,
                    height: 90,
                    borderRadius: "50%",
                    bgcolor: "#fff5ee",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    mb: 1,
                }}
            >
                <ShoppingBagOutlinedIcon sx={{ fontSize: 46, color: "#E8651C" }} />
            </Box>
            <Typography variant="h5" fontWeight={800} color="#111">
                Your cart is empty
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 320 }}>
                Looks like you haven&apos;t added anything yet. Browse our products and find
                something you love!
            </Typography>
            <Link href="/products/allProducts" style={{ textDecoration: "none" }}>
                <Button
                    variant="contained"
                    sx={{
                        mt: 1,
                        bgcolor: "#E8651C",
                        borderRadius: "10px",
                        px: 4,
                        py: 1.25,
                        textTransform: "none",
                        fontWeight: 600,
                        boxShadow: "none",
                        "&:hover": { bgcolor: "#d05a16", boxShadow: "none" },
                    }}
                >
                    Browse Products
                </Button>
            </Link>
        </Box>
    );
}

// ----- Cart Item Card -----
function CartItemCard({ item }: { item: { product: ProductResponse; quantity: number } }) {
    const dispatch = useAppDispatch();
    const { product, quantity } = item;
    const unitPrice = effectivePrice(product);
    const totalPrice = (unitPrice * quantity).toFixed(2);
    const hasDiscount = Boolean(product.discountPercentage);

    return (
        <Box
            sx={{
                display: "flex",
                gap: { xs: 1.5, sm: 2 },
                p: { xs: 1.5, sm: 2 },
                borderRadius: "14px",
                bgcolor: "white",
                boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
                alignItems: "center",
                transition: "box-shadow 0.2s ease",
                "&:hover": { boxShadow: "0 4px 20px rgba(0,0,0,0.10)" },
            }}
        >
            {/* Image */}
            <Box
                sx={{
                    flexShrink: 0,
                    width: { xs: 72, sm: 100 },
                    height: { xs: 72, sm: 100 },
                    borderRadius: "10px",
                    bgcolor: "#f5f5f5",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                }}
            >
                <Link href={`/products/${product.id}`}>

                    <Box
                        component="img"
                        src={product.thumbnail}
                        alt={product.title}
                        sx={{ width: "80%", height: "80%", objectFit: "contain", mixBlendMode: "multiply" }}
                    />
                </Link>

            </Box>

            {/* Info + Controls */}
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    variant="caption"
                    sx={{ color: "#E8651C", textTransform: "uppercase", fontSize: "0.68rem", letterSpacing: "0.04em" }}
                >
                    {product.category}
                </Typography>
                <Typography
                    variant="body1"
                    fontWeight={700}
                    sx={{
                        fontSize: { xs: "0.82rem", sm: "0.95rem" },
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

                {/* Quantity controls */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 0.5 }}>
                    <IconButton
                        size="small"
                        onClick={() => dispatch(decrementQuantity(product.id))}
                        sx={{
                            width: 28,
                            height: 28,
                            border: "1.5px solid #e0e0e0",
                            borderRadius: "7px",
                            color: "#555",
                            fontSize: "1rem",
                            "&:hover": { bgcolor: "#f5f5f5", borderColor: "#bbb" },
                        }}
                    >
                        −
                    </IconButton>
                    <Typography fontWeight={700} sx={{ minWidth: 20, textAlign: "center", fontSize: "0.92rem" }}>
                        {quantity}
                    </Typography>
                    <IconButton
                        size="small"
                        onClick={() => dispatch(incrementQuantity(product.id))}
                        sx={{
                            width: 28,
                            height: 28,
                            border: "1.5px solid #e0e0e0",
                            borderRadius: "7px",
                            color: "#555",
                            fontSize: "1rem",
                            "&:hover": { bgcolor: "#f5f5f5", borderColor: "#bbb" },
                        }}
                    >
                        +
                    </IconButton>
                </Box>
            </Box>

            {/* Price + Remove */}
            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 0.5, flexShrink: 0 }}>
                <Typography fontWeight={700} sx={{ color: "#E8651C", fontSize: { xs: "0.9rem", sm: "1rem" } }}>
                    ${totalPrice}
                </Typography>
                {hasDiscount && quantity > 1 && (
                    <Typography variant="caption" sx={{ color: "#aaa", textDecoration: "line-through", fontSize: "0.72rem" }}>
                        ${(product.price * quantity).toFixed(2)}
                    </Typography>
                )}
                <IconButton
                    size="small"
                    onClick={() => dispatch(removeFromCart(product.id))}
                    sx={{
                        mt: 0.5,
                        color: "#ccc",
                        "&:hover": { color: "#e53935", bgcolor: "#fff0f0" },
                    }}
                >
                    <DeleteOutlineIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box >
    );
}

// ----- Order Summary Panel -----
function OrderSummary({ subtotal }: { subtotal: number }) {
    const isDeliveryFree = subtotal >= 50;
    const tax = 0;
    const total = subtotal + tax;

    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {/* Summary card */}
            <Box
                sx={{
                    bgcolor: "white",
                    borderRadius: "16px",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.07)",
                    p: { xs: 2.5, sm: 3 },
                }}
            >
                <Typography variant="h6" fontWeight={800} color="#111" sx={{ mb: 2.5 }}>
                    Order Summary
                </Typography>

                {/* Row helper */}
                {[
                    { label: "Subtotal", value: `$${subtotal.toFixed(2)}`, valueColor: "#111" },
                    {
                        label: "Estimated Delivery",
                        value: isDeliveryFree ? "Free" : "$4.99",
                        valueColor: isDeliveryFree ? "#2e7d32" : "#111",
                    },
                    { label: "Tax", value: `$${tax.toFixed(2)}`, valueColor: "#111" },
                ].map(({ label, value, valueColor }) => (
                    <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1.5 }}>
                        <Typography variant="body2" color="text.secondary">
                            {label}
                        </Typography>
                        <Typography variant="body2" fontWeight={600} sx={{ color: valueColor }}>
                            {value}
                        </Typography>
                    </Box>
                ))}

                <Divider sx={{ my: 2 }} />

                {/* Total */}
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2.5 }}>
                    <Typography fontWeight={800} fontSize="1.05rem" color="#111">
                        Total
                    </Typography>
                    <Typography fontWeight={800} fontSize="1.25rem" sx={{ color: "#E8651C" }}>
                        ${total.toFixed(2)}
                    </Typography>
                </Box>

                {/* Checkout CTA */}
                <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                        bgcolor: "#E8651C",
                        borderRadius: "12px",
                        py: 1.4,
                        fontWeight: 700,
                        fontSize: "1rem",
                        textTransform: "none",
                        boxShadow: "0 4px 14px rgba(232,101,28,0.35)",
                        "&:hover": { bgcolor: "#d05a16", boxShadow: "0 4px 18px rgba(232,101,28,0.45)" },
                        mb: 1.5,
                    }}
                >
                    Checkout
                </Button>

                {/* Continue Shopping */}
                <Link href="/products/allProducts" style={{ textDecoration: "none" }}>
                    <Button
                        fullWidth
                        variant="outlined"
                        sx={{
                            borderRadius: "12px",
                            py: 1.2,
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            textTransform: "none",
                            borderColor: "#ddd",
                            color: "#444",
                            "&:hover": { bgcolor: "#f5f5f5", borderColor: "#bbb" },
                        }}
                    >
                        Continue Shopping
                    </Button>
                </Link>


            </Box>

            {/* Info cards */}
            {[
                {
                    icon: <LocalShippingOutlinedIcon sx={{ color: "#E8651C", fontSize: 28 }} />,
                    title: "Free Delivery",
                    desc: "Free standard shipping on all orders over $50.",
                    bg: "#fff8f4",
                },
                {
                    icon: <ShieldOutlinedIcon sx={{ color: "#1565C0", fontSize: 28 }} />,
                    title: "Secure Payment",
                    desc: "Your information is protected by industry standard encryption.",
                    bg: "#f4f7ff",
                },
            ].map(({ icon, title, desc, bg }) => (
                <Box
                    key={title}
                    sx={{
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 2,
                        p: 2,
                        borderRadius: "14px",
                        bgcolor: bg,
                    }}
                >
                    <Box sx={{ flexShrink: 0, mt: 0.25 }}>{icon}</Box>
                    <Box>
                        <Typography fontWeight={700} fontSize="0.9rem" color="#111">
                            {title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary" lineHeight={1.5}>
                            {desc}
                        </Typography>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

// ----- Page -----
export default function CartPage() {
    const dispatch = useAppDispatch();
    const rawItems = useAppSelector((state) => state.cart.items);
    // Filter out any corrupted entries where product is missing
    const cartItems = rawItems.filter((item) => item?.product != null);

    const subtotal = cartItems.reduce(
        (sum, item) => sum + effectivePrice(item.product) * item.quantity,
        0
    );

    if (cartItems.length === 0) return <EmptyCart />;

    return (
        <Box
            sx={{
                maxWidth: 1200,
                mx: "auto",
                px: { xs: 2, sm: 3, md: 4 },
                py: { xs: 3, sm: 4 },
                bgcolor: "#f7f7f8",
                minHeight: "100vh",
            }}
        >
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Typography variant="h5" fontWeight={800} color="#111">
                        Shopping Cart
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
                        {cartItems.length}
                    </Box>
                </Box>
                <Button
                    size="small"
                    startIcon={<DeleteOutlineIcon fontSize="small" />}
                    onClick={() => dispatch(clearCart())}
                    sx={{
                        textTransform: "none",
                        fontWeight: 600,
                        color: "#888",
                        fontSize: "0.82rem",
                        "&:hover": { color: "#e53935", bgcolor: "transparent" },
                    }}
                >
                    Clear Cart
                </Button>
            </Box>

            {/* Main grid */}
            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", md: "1fr 360px", lg: "1fr 390px" },
                    gap: { xs: 3, md: 4 },
                    alignItems: "start",
                }}
            >
                {/* Left: item list */}
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {cartItems.map((item) => (
                        <CartItemCard key={item.product.id} item={item} />
                    ))}
                </Box>

                {/* Right: summary */}
                <Box sx={{ position: { md: "sticky" }, top: { md: 24 } }}>
                    <OrderSummary subtotal={subtotal} />
                </Box>
            </Box>
        </Box>
    );
}