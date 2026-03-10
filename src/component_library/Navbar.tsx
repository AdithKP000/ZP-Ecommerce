"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import Badge from "@mui/material/Badge";
import SearchIcon from "@mui/icons-material/Search";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import LanguageIcon from "@mui/icons-material/Language";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppSelector } from "@/core_components/hooks/redux";
import { useAuth } from "@/core_components/hooks/useAuth";
import { Button } from "@mui/material";

interface NavLink {
    label: string;
    href: string;
    highlight?: boolean;
}

const navLinks: NavLink[] = [
    { label: "Home", href: "/" },
    { label: "All Products", href: "/products/allProducts" },
    { label: "Beauty", href: "/products/allProducts?category=beauty" },
    { label: "Fragrances", href: "/products/allProducts?category=fragrances" },
    { label: "Furniture", href: "/products/allProducts?category=furniture" },
    { label: "Groceries", href: "/products/allProducts?category=groceries" },
    { label: "Body", href: "/products/allProducts?category=body" },

    { label: "Sale", href: "/products/allProducts?category=sale", highlight: true },
];

interface NavbarProps {
    exclude?: string[];
}

export default function Navbar({ exclude = [] }: NavbarProps) {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const cartItems = useAppSelector((state) => state.cart.items);
    const { user, isLoggedIn } = useAuth();

    const isExcluded = exclude.some((path) => pathname === path);
    if (isExcluded) {
        return (
            <>
                {/* Brand name — absolutely centered */}
                <Box
                    sx={{
                        position: "absolute",
                        left: "50%",
                        transform: "translateX(-50%)",
                        pointerEvents: "none",
                    }}
                >
                    <Link href="/" style={{ textDecoration: "none", pointerEvents: "auto" }}>
                        <Typography
                            variant="h3"
                            component="span"
                            sx={{
                                fontWeight: 900,
                                mt: 1,
                                fontSize: { xs: "2rem", sm: "2rem", lg: '3rems' },
                                letterSpacing: { xs: 3, sm: 5 },
                                color: "#111",

                            }}
                        >
                            COSMO
                        </Typography>
                    </Link>
                </Box>
            </>
        )
    };

    const toggleDrawer = (open: boolean) => () => setDrawerOpen(open);
    return (
        <>
            <AppBar
                position="sticky"
                elevation={0}
                sx={{
                    backgroundColor: "#fff",
                    color: "#111",
                    borderBottom: "1px solid rgba(0,0,0,0.09)",
                    top: 0,
                    zIndex: 1100,
                }}
            >
                {/* ── ROW 1: Brand + Icons ─────────────────────────────────── */}
                <Toolbar
                    disableGutters
                    sx={{
                        px: { xs: 2, sm: 4, md: 6 },
                        minHeight: { xs: 56, sm: 64 },
                        display: "flex",
                        alignItems: "center",
                        position: "relative",
                    }}
                >
                    {/* Mobile hamburger (left anchor) */}
                    <IconButton
                        aria-label="open menu"
                        onClick={toggleDrawer(true)}
                        size="small"
                        sx={{ display: { xs: "flex", md: "none" }, color: "#111" }}
                    >
                        <MenuIcon />
                    </IconButton>

                    <Box
                        sx={{
                            position: "absolute",
                            left: "50%",
                            transform: "translateX(-50%)",
                            pointerEvents: "none",
                        }}
                    >
                        <Link href="/" style={{ textDecoration: "none", pointerEvents: "auto" }}>
                            <Typography
                                variant="h5"
                                component="span"
                                sx={{
                                    fontWeight: 900,
                                    fontSize: { xs: "1.25rem", sm: "1.5rem" },
                                    letterSpacing: { xs: 3, sm: 5 },
                                    color: "#111",

                                }}
                            >
                                COSMO
                            </Typography>
                        </Link>
                    </Box>

                    {/* Spacer */}
                    <Box sx={{ flexGrow: 1 }} />

                    {/* Right icons */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: { xs: 0, sm: 0.5 },
                        }}
                    >
                        {/* Language — desktop only */}


                        {/* Search */}
                        <IconButton size="small" aria-label="search" sx={{ color: "#333" }}>
                            <SearchIcon fontSize="small" />
                        </IconButton>


                        {/* Wishlist */}
                        <Link
                            href='/user/wishlist'
                        >
                            <IconButton
                                size="small"
                                aria-label="wishlist"
                                sx={{ color: "#333", display: { xs: "none", sm: "flex" } }}
                            >
                                <FavoriteBorderIcon fontSize="small" />
                            </IconButton>
                        </Link>

                        {/* Cart */}
                        <Link href="/user/cart">
                            <IconButton size="small" aria-label="cart" sx={{ color: "#333" }}>
                                <Badge
                                    badgeContent={cartItems.length}
                                    color="error"
                                    showZero={false}
                                    sx={{
                                        "& .MuiBadge-badge": {
                                            fontSize: "0.6rem",
                                            height: 16,
                                            minWidth: 16,
                                        },
                                    }}
                                >
                                    <ShoppingBagOutlinedIcon fontSize="small" />
                                </Badge>
                            </IconButton>
                        </Link>
                        {/* Account */}
                        {isLoggedIn ? (
                            <Link href="/user/profile">
                                <IconButton
                                    size="small"
                                    aria-label="account"
                                    sx={{ color: "#333", display: { xs: "none", sm: "flex" } }}
                                >
                                    <PersonOutlineIcon fontSize="small" />
                                </IconButton>
                            </Link>
                        ) : (
                            <Link href="/user/auth/signup">
                                <Button sx={{
                                    mt: 1,
                                    bgcolor: "#E8651C",
                                    borderRadius: "10px",
                                    px: 1.5,
                                    py: 0.5,
                                    color: "#fff",
                                    textTransform: "none",
                                    fontWeight: 600,
                                    boxShadow: "none",
                                    "&:hover": { bgcolor: "#d05a16", boxShadow: "none" },
                                }}>
                                    Signup
                                </Button>
                            </Link>
                        )}
                    </Box>
                </Toolbar>

                {/* ── ROW 2: Category nav (desktop only) ───────────────────── */}
                <Box
                    component="nav"
                    aria-label="main navigation"
                    sx={{
                        display: { xs: "none", md: "flex" },
                        justifyContent: "center",
                        alignItems: "center",
                        borderTop: "1px solid rgba(0,0,0,0.07)",
                        gap: 0,
                        px: { md: 2, lg: 4 },
                        height: 42,
                    }}
                >
                    {navLinks.map((link) => (
                        <Link key={link.label} href={link.href} style={{ textDecoration: "none" }}>
                            <Box
                                sx={{
                                    px: { md: 1.5, lg: 2 },
                                    py: 1,
                                    fontSize: { md: "0.78rem", lg: "0.85rem" },
                                    fontWeight: 400,
                                    color: link.highlight ? "#e53935" : "#222",
                                    whiteSpace: "nowrap",
                                    cursor: "pointer",
                                    position: "relative",
                                    transition: "color 0.2s",
                                    letterSpacing: 0.1,
                                    "&::after": {
                                        content: '""',
                                        position: "absolute",
                                        bottom: 0,
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        width: 0,
                                        height: "1.5px",
                                        backgroundColor: link.highlight ? "#e53935" : "#111",
                                        transition: "width 0.25s ease",
                                    },
                                    "&:hover": {
                                        color: link.highlight ? "#c62828" : "#000",
                                    },
                                    "&:hover::after": {
                                        width: "70%",
                                    },
                                }}
                            >
                                {link.label}
                            </Box>
                        </Link>
                    ))}
                </Box>
            </AppBar>

            {/* ── Mobile Drawer ─────────────────────────────────────────── */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                PaperProps={{
                    sx: { width: 280, pt: 1 },
                }}
            >
                {/* Drawer header */}
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        px: 2,
                        pb: 1,
                    }}
                >
                    <Typography
                        variant="h6"
                        sx={{ fontWeight: 900, letterSpacing: 3 }}
                    >
                        COSMO
                    </Typography>
                    <IconButton onClick={toggleDrawer(false)} size="small">
                        <CloseIcon />
                    </IconButton>
                </Box>

                <Divider />

                {/* Nav links */}
                <List sx={{ pt: 1 }}>
                    {navLinks.map((link) => (
                        <ListItem key={link.label} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={link.href}
                                onClick={toggleDrawer(false)}
                                sx={{
                                    px: 3,
                                    py: 1.2,
                                    "&:hover": { backgroundColor: "rgba(0,0,0,0.04)" },
                                }}
                            >
                                <ListItemText
                                    primary={link.label}
                                    slotProps={{
                                        primary: {
                                            sx: {
                                                fontSize: "0.95rem",
                                                fontWeight: link.highlight ? 600 : 400,
                                                color: link.highlight ? "#e53935" : "#222",
                                            },
                                        },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>

                <Divider sx={{ mt: 1 }} />

                {/* Mobile utility links */}
                <List>
                    {[
                        { label: "Account", icon: <PersonOutlineIcon fontSize="small" />, href: "/user/auth/signup" },
                        { label: "Wishlist", icon: <FavoriteBorderIcon fontSize="small" />, href: "/user/wishlist" },
                        { label: "Language: EN", icon: <LanguageIcon fontSize="small" />, href: "#" },
                    ].map((item) => (
                        <ListItem key={item.label} disablePadding>
                            <ListItemButton
                                component={Link}
                                href={item.href}
                                onClick={toggleDrawer(false)}
                                sx={{ px: 3, py: 1 }}
                            >
                                <Box sx={{ mr: 2, color: "#555", display: "flex" }}>{item.icon}</Box>
                                <ListItemText
                                    primary={item.label}
                                    slotProps={{
                                        primary: { sx: { fontSize: "0.875rem", color: "#444" } },
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
            </Drawer>
        </>
    );
}
