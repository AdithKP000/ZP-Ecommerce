"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import Image from "next/image";
import makeupImg from "../../../public/makeup_bestsellers.png";
import organicImg from "../../../public/organic_selection.png"

export default function GenderCategoryBanner() {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
                gap: 3,
                px: { xs: 2, md: 4 },
                py: 3,
                mt: 4,
            }}
        >
            {/* Left Card — Makeup Bestsellers (dark overlay) */}
            <Box
                sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    minHeight: { xs: 260, md: 320 },
                    display: "flex",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                    },
                    "&:hover img": {
                        filter: "brightness(0.65)",
                    },
                }}
            >
                <Image
                    src={makeupImg}
                    alt="Makeup bestsellers"
                    fill
                    style={{
                        objectFit: "cover",
                        objectPosition: "center",
                        transition: "filter 0.3s ease",
                    }}
                    sizes="(max-width: 600px) 100vw, 50vw"
                />

                {/* Dark gradient overlay */}
                <Box
                    sx={{
                        position: "absolute",
                        inset: 0,
                        background:
                            "linear-gradient(to right, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.35) 60%, transparent 100%)",
                    }}
                />

                {/* Text content */}
                <Box
                    sx={{
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        left: 0,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: { xs: 3, md: 4 },
                        py: 3,
                        color: "white",
                        maxWidth: "60%",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={900}
                        sx={{
                            mb: 1,
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            lineHeight: 1.2,
                        }}
                    >
                        Makeup Bestsellers
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 2.5,
                            color: "rgba(255,255,255,0.85)",
                            fontSize: { xs: "0.8rem", md: "0.9rem" },
                        }}
                    >
                        Create the perfect look with our top picks.
                    </Typography>
                    <Box>
                        <Button
                            component={Link}
                            href="/products/allProducts?category=beauty"
                            variant="outlined"
                            sx={{
                                color: "white",
                                borderColor: "white",
                                borderRadius: "6px",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 0.8,
                                fontSize: "0.85rem",
                                "&:hover": {
                                    backgroundColor: "rgba(255,255,255,0.15)",
                                    borderColor: "white",
                                },
                            }}
                        >
                            Browse
                        </Button>
                    </Box>
                </Box>
            </Box>

            {/* Right Card — Organic Selection (light theme) */}
            <Box
                sx={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    minHeight: { xs: 260, md: 320 },
                    display: "flex",
                    backgroundColor: "#f5ebe0",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                    "&:hover": {
                        transform: "translateY(-4px)",
                        boxShadow: 8,
                    },
                }}
            >
                {/* Text content — left side */}
                <Box
                    sx={{
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        px: { xs: 3, md: 4 },
                        py: 3,
                        maxWidth: "55%",
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={900}
                        sx={{
                            mb: 1,
                            fontSize: { xs: "1.5rem", md: "2rem" },
                            lineHeight: 1.2,
                            color: "#1a1a1a",
                        }}
                    >
                        Organic Selection
                    </Typography>
                    <Typography
                        variant="body2"
                        sx={{
                            mb: 2.5,
                            color: "#5a5a5a",
                            fontSize: { xs: "0.8rem", md: "0.9rem" },
                        }}
                    >
                        Only natural ingredients for your beauty.
                    </Typography>
                    <Box>
                        <Button
                            component={Link}
                            href="/products/allProducts?category=fragrances"
                            variant="contained"
                            sx={{
                                backgroundColor: "#e36817",
                                color: "white",
                                borderRadius: "6px",
                                textTransform: "none",
                                fontWeight: 600,
                                px: 3,
                                py: 0.8,
                                fontSize: "0.85rem",
                                "&:hover": {
                                    backgroundColor: "#c8570f",
                                },
                            }}
                        >
                            Learn More
                        </Button>
                    </Box>
                </Box>

                {/* Image — right side */}
                <Box
                    sx={{
                        position: "absolute",
                        right: 0,
                        top: 0,
                        bottom: 0,
                        width: "55%",
                    }}
                >
                    <Image
                        src={organicImg}
                        alt="Organic selection"
                        fill
                        style={{
                            objectFit: "cover",
                            objectPosition: "center",
                        }}
                        sizes="(max-width: 600px) 100vw, 30vw"
                    />
                </Box>
            </Box>
        </Box>
    );
}
