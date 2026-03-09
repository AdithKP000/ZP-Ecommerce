"use client";
import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface Slide {
    image: string;
    badge: string;
    headline: string;
    subtext: string;
    cta: string;
    /** left-align text or right-align depending on image composition */
    align?: "left" | "right";
}

const slides: Slide[] = [
    {
        image: "/brand-spotlight/cliniquev2.png",
        badge: "New Arrivals",
        headline: "Clinique",
        subtext:
            "Discover Clinique for yourself. Skincare, makeup, fragrances, and more. Allergy tested. Dermatologist validated.",
        cta: "Go to brand",
        align: "left",
    },
    {
        image: "/brand-spotlight/estee-lauderv2.png",
        badge: "Visit store",
        headline: "Estée Lauder",
        subtext:
            "Iconic beauty brand offering a complete range of skincare, makeup, and fragrance products.",
        cta: "Go to brand",
        align: "left",
    },
    {
        image: "/brand-spotlight/macv2.png",
        badge: "BRAND",
        headline: "MAC",
        subtext:
            "All ages, all races, all sexes. Professional quality makeup loved by makeup artists worldwide.",
        cta: "Go to brand",
        align: "left",
    },

];

const AUTO_PLAY_INTERVAL = 5000;

export default function HeroCarousel() {
    const [current, setCurrent] = useState(0);
    const [animating, setAnimating] = useState(false);

    const goTo = useCallback(
        (index: number) => {
            if (animating) return;
            setAnimating(true);
            setCurrent((index + slides.length) % slides.length);
            setTimeout(() => setAnimating(false), 600);
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
                height: { xs: "50vh", sm: "90vw", md: "95vw", lg: "100vw" },
                minHeight: { xs: 400, sm: 340, md: 420 },
                maxHeight: { xs: 600, sm: 520, md: 600 },
                overflow: "hidden",
                backgroundColor: "#111",
            }}
        >
            {/* Slides */}
            {slides.map((s, i) => (
                <Box
                    key={i}
                    sx={{
                        position: "absolute",
                        inset: 0,
                        opacity: i === current ? 1 : 0,
                        transition: "opacity 0.6s ease",
                        zIndex: i === current ? 1 : 0,
                    }}
                >
                    <Image
                        src={s.image}
                        alt={s.headline.replace("\n", " ")}
                        fill
                        style={{ objectFit: "cover", objectPosition: "center", }}

                        priority={i === 0}
                        sizes="100vw"
                    />
                    {/* Dark gradient overlay on left side for text legibility */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                                s.align === "left"
                                    ? "linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)"
                                    : "linear-gradient(to left, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.35) 50%, transparent 100%)",
                        }}
                    />
                </Box>
            ))}

            {/* Text overlay */}
            <Box
                sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 2,
                    display: "flex",
                    alignItems: "center",
                    px: { xs: 3, sm: 5, md: 8 },

                }}
            >
                <Box
                    sx={{
                        maxWidth: { xs: "85%", sm: 380, md: 440 },
                        color: "white",
                        opacity: animating ? 0 : 1,
                        transform: animating ? "translateY(12px)" : "translateY(0)",
                        transition: "opacity 0.5s ease, transform 0.5s ease",
                    }}
                >
                    {/* Badge */}
                    <Chip
                        label={slide.badge}
                        size="small"
                        sx={{
                            mb: 2,
                            backgroundColor: "#1111d4",
                            color: "white",
                            fontWeight: 700,
                            fontSize: "0.65rem",
                            letterSpacing: 1,
                            borderRadius: "4px",
                            height: 24,
                        }}
                    />

                    {/* Headline */}
                    <Typography
                        variant="h2"
                        component="h1"
                        sx={{
                            fontWeight: 800,
                            fontSize: { xs: "1.8rem", sm: "2.4rem", md: "3rem" },
                            lineHeight: 1.15,
                            mb: 1.5,
                            whiteSpace: "pre-line",
                            textShadow: "0 2px 12px rgba(0,0,0,0.4)",

                        }}
                    >
                        {slide.headline}
                    </Typography>

                    {/* Subtext */}
                    <Typography
                        variant="body1"
                        sx={{
                            fontSize: { xs: "0.8rem", sm: "0.9rem", md: "1rem" },
                            lineHeight: 1.6,
                            mb: 3,
                            opacity: 0.9,
                            maxWidth: 320,
                        }}
                    >
                        {slide.subtext}
                    </Typography>

                    {/* CTA */}
                    <Button
                        variant="contained"
                        size="medium"
                        sx={{
                            backgroundColor: "#1111d4",
                            color: "white",
                            fontWeight: 700,
                            px: 3,
                            py: 1,
                            borderRadius: "6px",
                            textTransform: "none",
                            fontSize: "0.9rem",
                            "&:hover": {
                                backgroundColor: "#0d0db0",
                            },
                        }}
                    >
                        {slide.cta}
                    </Button>
                </Box>
            </Box>

            {/* Prev / Next arrow buttons */}
            <IconButton
                onClick={prev}
                size="small"
                sx={{
                    position: "absolute",
                    left: { xs: 8, sm: 16 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    backgroundColor: "rgba(255,255,255,0.18)",
                    color: "white",
                    backdropFilter: "blur(4px)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.32)" },
                    display: { xs: "none", sm: "flex" },
                }}
            >
                <ChevronLeftIcon />
            </IconButton>
            <IconButton
                onClick={next}
                size="small"
                sx={{
                    position: "absolute",
                    right: { xs: 8, sm: 16 },
                    top: "50%",
                    transform: "translateY(-50%)",
                    zIndex: 3,
                    backgroundColor: "rgba(255,255,255,0.18)",
                    color: "white",
                    backdropFilter: "blur(4px)",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.32)" },
                    display: { xs: "none", sm: "flex" },
                }}
            >
                <ChevronRightIcon />
            </IconButton>

            {/* Dot navigation */}
            <Box
                sx={{
                    position: "absolute",
                    bottom: { xs: 12, sm: 20 },
                    left: "50%",
                    transform: "translateX(-50%)",
                    zIndex: 3,
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                }}
            >
                {slides.map((_, i) => (
                    <Box
                        key={i}
                        onClick={() => goTo(i)}
                        sx={{
                            width: i === current ? 22 : 8,
                            height: 8,
                            borderRadius: "4px",
                            backgroundColor: i === current ? "white" : "rgba(255,255,255,0.5)",
                            transition: "all 0.3s ease",
                            cursor: "pointer",
                        }}
                    />
                ))}
            </Box>
        </Box>
    );
}
