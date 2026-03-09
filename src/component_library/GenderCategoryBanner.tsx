"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Image from "next/image";
import womenImg from "../../public/womens_fashion.png"
import menImg from "../../public/mens_fashion.png";

const categories = [
    {
        label: "Women's Collection",
        description: "Discover the latest trends in female fashion.",
        href: "/products?category=womens-clothing",
        image: womenImg,
        alt: "Women's fashion",
    },
    {
        label: "Men's Apparel",
        description: "Clean lines and classic silhouettes.",
        href: "/products?category=mens-clothing",
        image: menImg,
        alt: "Men's fashion",
    },
];

export default function GenderCategoryBanner() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 2,
                px: 2,
                py: 3,
                mt: 4
            }}
        >
            {categories.map((cat) => (
                <Box
                    key={cat.label}
                    sx={{
                        position: "relative",
                        borderRadius: "14px",
                        overflow: "hidden",
                        // Subtle lift on hover
                        transition: "transform 0.25s ease, box-shadow 0.25s ease",
                        "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: 8,
                        },
                        // Brighten image slightly on hover
                        "&:hover img": {
                            filter: "brightness(0.75)",
                        },
                    }}
                >
                    {/* Background image */}
                    <Image
                        src={cat.image}
                        alt={cat.alt}
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            objectPosition: "top",
                            display: "block",
                            transition: "filter 0.3s ease",
                            maxHeight: 420,
                            minHeight: 260,
                        }}
                        sizes="(max-width: 600px) 100vw, 50vw"
                    />

                    {/* Gradient overlay */}
                    <Box
                        sx={{
                            position: "absolute",
                            inset: 0,
                            background:
                                "linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.18) 55%, transparent 100%)",
                        }}
                    />

                    {/* Text content */}
                    <Box
                        sx={{
                            position: "absolute",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            px: 3,
                            py: 2.5,
                            color: "white",
                        }}
                    >
                        <Typography variant="h5" fontWeight={700} sx={{ mb: 0.5 }}>
                            {cat.label}
                        </Typography>
                        <Typography variant="body2" sx={{ mb: 1.5, color: "rgba(255,255,255,0.85)" }}>
                            {cat.description}
                        </Typography>
                        <Link
                            href={cat.href}
                            style={{
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.875rem",
                                textDecoration: "underline",
                                textUnderlineOffset: "3px",
                            }}
                        >
                            Explore Now
                        </Link>
                    </Box>
                </Box>
            ))}
        </Box>
    );
}
