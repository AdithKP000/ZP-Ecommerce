"use client"
import React, { useState } from "react"
import {
    Box,
    Drawer,
    IconButton,
    TextField,
    Typography,
    Grid,
    Chip,
    InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from '@mui/icons-material/History';
import { useRouter } from "next/navigation";

interface SearchProps {
    open: boolean;
    onClose: () => void;
}

const recentSearches = [
    "Mascara",
    "Lipstick",
    "Calvin Klein CK One",
    "Annibale "
];

export default function SearchComponent({ open, onClose }: SearchProps) {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const query = search.trim();
        if (!query) return;
        onClose();
        router.push(`/products/allProducts?search=${encodeURIComponent(query)}`);
    };

    const handleChipClick = (term: string) => {
        onClose();
        router.push(`/products/allProducts?search=${encodeURIComponent(term)}`);
    };

    return (
        <Drawer
            anchor="top"
            open={open}
            onClose={onClose}
            transitionDuration={400}
            PaperProps={{
                sx: {
                    width: '100%',
                    maxHeight: '80vh',
                    p: { xs: 2, sm: 4, md: 6 },
                    borderBottomLeftRadius: 16,
                    borderBottomRightRadius: 16,
                }
            }}
        >
            {/* Search Bar Row */}
            <Box
                component="form"
                role="search"
                onSubmit={handleFormSubmit}
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    borderBottom: '2px solid bg.signup',
                    pb: 1,
                    mb: 4
                }}
            >
                <TextField
                    fullWidth
                    role="searchField"
                    variant="standard"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search for products, brands..."
                    autoFocus
                    InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon sx={{ color: 'bg.signup', fontSize: 28, mr: 1 }} />
                            </InputAdornment>
                        ),
                        sx: {
                            fontSize: '1.5rem',
                            fontWeight: 300,
                            '& input::placeholder': {
                                color: '#999',
                                opacity: 1
                            }
                        }
                    }}
                />
                <IconButton onClick={onClose} sx={{ color: '#555' }}>
                    <CloseIcon />
                </IconButton>
            </Box>

            {/* Recent Searches */}
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <HistoryIcon sx={{ color: 'bg.signup', mr: 1, fontSize: 18 }} />
                        <Typography variant="overline" sx={{ fontWeight: 700, color: 'bg.signup', letterSpacing: 1.5 }}>
                            RECENT SEARCHES
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                        {recentSearches.map((term) => (
                            <Chip
                                key={term}
                                label={term}
                                onClick={() => handleChipClick(term)}
                                sx={{
                                    bgcolor: '#FFF5F0',
                                    color: '#333',
                                    fontWeight: 500,
                                    fontSize: '0.9rem',
                                    px: 1,
                                    py: 2.5,
                                    borderRadius: '20px',
                                    border: '1px solid #FFEBE0',
                                    '&:hover': {
                                        bgcolor: '#FFEBE0'
                                    }
                                }}
                            />
                        ))}
                    </Box>
                </Grid>
            </Grid>
        </Drawer>
    )
}