"use client"

import { Box, Container, Typography } from "@mui/material"

export default function Footer() {
    return (
        <>
            < Box sx={{
                backgroundColor: "#f2f2f2ff", color: "#000",
                p: 2,

            }}>
                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                }}>
                    <Typography
                        variant="h3"
                        component="span"
                        sx={{
                            fontWeight: 900,
                            mt: 1,
                            pb: 0,
                            fontSize: { xs: "2rem", sm: "2rem", lg: '3rems' },
                            letterSpacing: { xs: 3, sm: 5 },
                            color: "#111",

                        }}
                    >
                        COSMO
                    </Typography>
                    <Typography variant="body2" sx={{
                        fontWeight: 500,
                        mt: 0,
                        fontSize: { xs: "1rem", sm: "1rem", lg: '1.5rems' },
                        color: "#616060ff",

                    }}>
                        Yuor Online Cosmetics Store
                    </Typography>
                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: { xs: 1, sm: 2, md: 3, lg: 10 },
                    mt: 3,
                    color: "#616060ff",
                }}>
                    <Typography>About</Typography>
                    <Typography>Shop</Typography>
                    <Typography>Blog</Typography>
                    <Typography>Contact</Typography>

                </Box>

                <Box sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "row",
                    gap: 13,
                    mt: 3,
                    color: "#616060ff",
                }}>
                    <Typography sx={{
                        fontSize: '0.8rem'

                    }}>Copyright © 2026 Cosmo. All rights reserved.</Typography>
                </Box>
            </Box >
        </>
    )
}