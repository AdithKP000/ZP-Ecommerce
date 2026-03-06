"use client"
import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import ShoppingBagOutlinedIcon from '@mui/icons-material/ShoppingBagOutlined';
import MoreIcon from '@mui/icons-material/MoreVert';
import Divider from '@mui/material/Divider';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: theme.palette.searchBar.bg,
    '&:hover': {
        backgroundColor: theme.palette.searchBar.bgHover,
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.text.secondary,
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: theme.palette.text.primary,
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '22ch',
        },
    },
}));

const navLinks = ['Shop All', 'Men', 'Women', 'Accessories'];

export default function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
        React.useState<null | HTMLElement>(null);
    const [mobileNavMenu, setMobileNavMenu] = React.useState<null | HTMLElement>(null);

    const isMenuOpen = Boolean(anchorEl);
    const isNavbarOpen = Boolean(mobileNavMenu);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleNavbarClose = () => {
        setMobileNavMenu(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleMobileNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setMobileNavMenu(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const renderNavbar = (
        <Menu
            anchorEl={mobileNavMenu}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            id="mobile-nav-menu"
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            open={isNavbarOpen}
            onClose={handleNavbarClose}
        >
            {navLinks.map((page, index) => (
                <MenuItem key={index} onClick={handleNavbarClose}>
                    {page}
                </MenuItem>
            ))}
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem>
                <IconButton size="large" aria-label="cart" color="inherit">
                    <Badge badgeContent={3} color="error">
                        <ShoppingBagOutlinedIcon />
                    </Badge>
                </IconButton>
                <p>Cart</p>
            </MenuItem>
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    size="large"
                    aria-label="account of current user"
                    aria-controls={menuId}
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle />
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar
                position="static"
                elevation={0}
                sx={{
                    backgroundColor: 'white',
                    color: 'black',
                    borderBottom: '1px solid',
                    borderColor: 'rgba(0,0,0,0.08)',
                }}
            >
                <Toolbar sx={{ minHeight: { xs: 64, sm: 76 }, px: { xs: 2, sm: 4 } }}>
                    {/* Mobile hamburger */}
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleMobileNavMenu}
                        sx={{ mr: 1, display: { lg: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>

                    {/* Brand */}
                    <Typography
                        variant="h5"
                        noWrap
                        component="div"
                        sx={{
                            fontWeight: 900,
                            color: '#1111d4',
                            letterSpacing: 1,
                            mr: 3,
                            flexShrink: 0,
                        }}
                    >
                        LUXE
                    </Typography>

                    {/* Desktop nav links */}
                    <Box sx={{ display: { xs: 'none', lg: 'flex' }, gap: 0.5 }}>
                        {navLinks.map((page) => (
                            <MenuItem
                                key={page}
                                sx={{
                                    borderRadius: 2,
                                    px: 2,
                                    py: 1,
                                    '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
                                }}
                            >
                                <Typography
                                    sx={{
                                        fontSize: '0.9rem',
                                        fontWeight: 600,
                                        color: 'text.primary',
                                        whiteSpace: 'nowrap',
                                    }}
                                >
                                    {page}
                                </Typography>
                            </MenuItem>
                        ))}
                    </Box>

                    <Box sx={{ flexGrow: 1 }} />

                    {/* Search bar */}
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon fontSize="small" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            className="search-input"
                            placeholder="Search products…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>

                    {/* Desktop icons: Cart + Profile */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 0.5 }}>
                        <IconButton size="large" aria-label="cart" color="inherit">
                            <Badge badgeContent={3} color="error">
                                <ShoppingBagOutlinedIcon />
                            </Badge>
                        </IconButton>
                        <IconButton
                            size="large"
                            edge="end"
                            aria-label="account of current user"
                            aria-controls={menuId}
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </Box>

                    {/* Mobile overflow menu */}
                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="show more"
                            aria-controls={mobileMenuId}
                            aria-haspopup="true"
                            onClick={handleMobileMenuOpen}
                            color="inherit"
                        >
                            <MoreIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMobileMenu}
            {renderMenu}
            {renderNavbar}
        </Box>
    );
}
