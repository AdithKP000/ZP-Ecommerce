"use client";
import React, { useState, useCallback, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import Image from "next/image";
import Link from "next/link";

interface BrandSlide {
    badge: string;
    brandName: string;
    description: string;
    ctaLabel: string;
    ctaHref: string;
    image: string;
    /** Background color for the banner, defaults to cream */
    bgColor?: string;
}

const slides: BrandSlide[] = [
    {
        badge: "BRAND",
        brandName: "Clinique",
        description:
            "Discover Clinique for yourself. Skincare, makeup, fragrances, and more. Allergy tested. Dermatologist validated.",
        ctaLabel: "Go to brand",
        ctaHref: "/products?brand=clinique",
        image: "/brand-spotlight/cliniquev2.png",
        bgColor: "#f5f0eb",
    },
    {
        badge: "BRAND",
        brandName: "Estée Lauder",
        description:
            "Iconic beauty brand offering a complete range of skincare, makeup, and fragrance products.",
        ctaLabel: "Go to brand",
        ctaHref: "/products?brand=estee-lauder",
        image: "/brand-spotlight/estee-lauderv2.png",
        bgColor: "#edf0f5",
    },
    {
        badge: "BRAND",
        brandName: "MAC",
        description:
            "All ages, all races, all sexes. Professional quality makeup loved by makeup artists worldwide.",
        ctaLabel: "Go to brand",
        ctaHref: "/products?brand=mac",
        image: "/brand-spotlight/macv2.png",
        bgColor: "#f0ede8",
    },
];

const AUTO_PLAY_INTERVAL = 6000;

export default function BrandSpotlightBanner() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (animating) return;
            setAnimating(true);
            setCurrent((index + slides.length) % slides.length);
            setTimeout(() => setAnimating(false), 500);
        },
        [animating]
    );

    const next = useCallback(() => goTo(current + 1), [current, goTo]);
    const prev = useCallback(() => goTo(current - 1), [current, goTo]);

    useEffect(() => {
        const timer = setInterval(next, AUTO_PLAY_INTERVAL);
        return () => clearInterval(timer);
    }, [next]);

    const slide = slides[current];

    return (
        <Box
            sx={{
                position: "relative",
                width: "100%",
                backgroundColor: slide.bgColor ?? "#f5f0eb",
                transition: "background-color 0.5s ease",
                overflow: "hidden",
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                alignItems: "stretch",
                minHeight: { xs: 320, sm: 280, md: 340 },
                maxHeight: { xs: "none", sm: 400 },
                borderRadius: { xs: 0, md: "0px" },
            }}
        >
            {/* ── LEFT: Text card ─────────────────────────────────────────── */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    px: { xs: 3, sm: 5, md: 8 },
                    py: { xs: 4, sm: 3 },
                    zIndex: 2,
                    flex: "0 0 auto",
                    width: { xs: "100%", sm: "42%", md: "38%" },
                }}
            >
                <Box
                    sx={{
                        background: "rgba(255, 255, 255, 0.85)",
                        backdropFilter: "blur(6px)",
                        borderRadius: "10px",
                        px: { xs: 3, sm: 3.5, md: 4 },
                        py: { xs: 3, sm: 3.5 },
                        width: "100%",
                        maxWidth: 340,
                        opacity: animating ? 0 : 1,
                        transform: animating ? "translateX(-12px)" : "translateX(0)",
                        transition: "opacity 0.45s ease, transform 0.45s ease",
                        boxShadow: "0 2px 24px rgba(0,0,0,0.07)",
                    }}
                >
                    {/* Badge */}
                    <Typography
                        variant="overline"
                        sx={{
                            display: "block",
                            fontSize: "0.65rem",
                            fontWeight: 700,
                            letterSpacing: 2.5,
                            color: "#888",
                            mb: 0.75,
                        }}
                    >
                        {slide.badge}
                    </Typography>

                    {/* Brand name */}
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            fontWeight: 700,
                            fontSize: { xs: "1.8rem", sm: "2rem", md: "2.4rem" },
                            lineHeight: 1.1,
                            color: "#111",
                            mb: 1.5,
                            fontFamily: "'Georgia', serif",
                        }}
                    >
                        {slide.brandName}
                    </Typography>

                    {/* Description */}
                    <Typography
                        variant="body2"
                        sx={{
                            color: "#555",
                            lineHeight: 1.65,
                            mb: 2.5,
                            fontSize: { xs: "0.8rem", sm: "0.85rem" },
                        }}
                    >
                        {slide.description}
                    </Typography>

                    {/* CTA Button */}
                    <Button
                        component={Link}
                        href={slide.ctaHref}
                        variant="contained"
                        endIcon={<ArrowForwardIcon fontSize="small" />}
                        sx={{
                            backgroundColor: "#111",
                            color: "#fff",
                            fontWeight: 600,
                            fontSize: "0.82rem",
                            px: 2.5,
                            py: 1,
                            borderRadius: "6px",
                            textTransform: "none",
                            letterSpacing: 0.3,
                            "&:hover": {
                                backgroundColor: "#2a2a2a",
                                transform: "translateX(2px)",
                            },
                            transition: "background-color 0.2s ease, transform 0.2s ease",
                        }}
                    >
                        {slide.ctaLabel}
                    </Button>
                </Box>
            </Box>

            {/* ── RIGHT: Product image ─────────────────────────────────────── */}
            <Box
                sx={{
                    position: "relative",
                    flex: 1,
                    minHeight: { xs: 220, sm: 0 },
                    overflow: "hidden",
                }}
            >
                {slides.map((s, i) => (
                    <Box
                        key={i}
                        sx={{
                            position: "absolute",
                            inset: 0,
                            opacity: i === current ? 1 : 0,
                            transition: "opacity 0.5s ease-in-out",
                            zIndex: i === current ? 1 : 0,
                        }}
                    >
                        <Image
                            src={s.image}
                            alt={s.brandName}
                            fill
                            style={{
                                objectFit: "contain",
                                objectPosition: "center bottom",
                            }}
                            sizes="(max-width: 600px) 100vw, 60vw"
                            priority={i === 0}
                        />
                    </Box>
                ))}
            </Box>

            {/* ── Bottom controls ──────────────────────────────────────────── */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: { xs: 12, sm: 16 },
                    right: { xs: 12, sm: 20 },
                    zIndex: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 0.5,
                }}
            >
                {/* Dot indicators */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, mr: 1 }}>
                    {slides.map((_, i) => (
                        <Box
                            key={i}
                            onClick={() => goTo(i)}
                            sx={{
                                width: i === current ? 18 : 7,
                                height: 7,
                                borderRadius: "4px",
                                backgroundColor: i === current ? "#111" : "rgba(0,0,0,0.25)",
                                transition: "all 0.3s ease",
                                cursor: "pointer",
                            }}
                        />
                    ))}
                </Box>

                {/* Prev arrow */}
                <IconButton
                    onClick={prev}
                    size="small"
                    sx={{
                        backgroundColor: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(0,0,0,0.12)",
                        color: "#333",
                        width: 32,
                        height: 32,
                        backdropFilter: "blur(4px)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" },
                    }}
                >
                    <ChevronLeftIcon fontSize="small" />
                </IconButton>

                {/* Next arrow */}
                <IconButton
                    onClick={next}
                    size="small"
                    sx={{
                        backgroundColor: "rgba(255,255,255,0.75)",
                        border: "1px solid rgba(0,0,0,0.12)",
                        color: "#333",
                        width: 32,
                        height: 32,
                        backdropFilter: "blur(4px)",
                        "&:hover": { backgroundColor: "rgba(255,255,255,0.95)" },
                    }}
                >
                    <ChevronRightIcon fontSize="small" />
                </IconButton>
            </Box>
        </Box>
    );
}
