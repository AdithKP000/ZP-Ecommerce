"use client"
import { useAppSelector, useAppDispatch } from "@/core_components/hooks/redux"
import { logout } from "@/core_components/state/slices/userSlice"
import {
    Container,
    Box,
    Typography,
    Paper,
    Avatar,
    Grid,
    Button,
    Divider,
    List,
    ListItem,
    ListItemIcon,
    ListItemText
} from "@mui/material"
import {
    Person as PersonIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    ArrowBack as ArrowBackIcon
} from "@mui/icons-material"
import { useRouter } from "next/navigation"

export default function Profile() {
    const user = useAppSelector((state) => state.user.user)
    const dispatch = useAppDispatch()
    const router = useRouter()

    const handleLogout = () => {
        dispatch(logout())
        router.push("/user/auth/login")
    }

    const handleBackToShop = () => {
        router.push("/")
    }

    if (!user) {
        return (
            <Container maxWidth="sm">
                <Box sx={{ mt: 10, textAlign: 'center' }}>
                    <Typography variant="h5" gutterBottom>
                        Please log in to view your profile.
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => router.push("/user/auth/login")}
                        sx={{ mt: 2, bgcolor: '#000', '&:hover': { bgcolor: '#333' } }}
                    >
                        Go to Login
                    </Button>
                </Box>
            </Container>
        )
    }

    return (
        <Container maxWidth="md" sx={{ py: 8 }}>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Button
                    startIcon={<ArrowBackIcon />}
                    onClick={handleBackToShop}
                    sx={{ color: '#666', textTransform: 'none' }}
                >
                    Back to Shop
                </Button>
                <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>
                    My Profile
                </Typography>
                <Box sx={{ width: 100 }} /> {/* Spacer for balance */}
            </Box>

            <Grid container spacing={4}>
                {/* Profile Overview */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            textAlign: 'center',
                            borderRadius: 4,
                            border: '1px solid #eee',
                            height: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Avatar
                            sx={{
                                width: 100,
                                height: 100,
                                mb: 2,
                                bgcolor: '#000',
                                fontSize: '2.5rem',
                                fontWeight: 700
                            }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </Avatar>
                        <Typography variant="h6" fontWeight={700}>
                            {user.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                            Customer since 2024
                        </Typography>

                        <Box sx={{ mt: 'auto', width: '100%' }}>
                            <Button
                                fullWidth
                                variant="outlined"
                                color="error"
                                startIcon={<LogoutIcon />}
                                onClick={handleLogout}
                                sx={{
                                    borderRadius: 2,
                                    textTransform: 'none',
                                    fontWeight: 600,
                                    borderColor: '#eee',
                                    color: '#d32f2f',
                                    '&:hover': {
                                        borderColor: '#ffcdd2',
                                        bgcolor: '#fff5f5'
                                    }
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    </Paper>
                </Grid>

                {/* Profile Details */}
                <Grid item xs={12} md={8}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 4,
                            borderRadius: 4,
                            border: '1px solid #eee'
                        }}
                    >
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 3 }}>
                            Personal Information
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <List disablePadding>
                            <ListItem sx={{ px: 0, py: 2 }}>
                                <ListItemIcon>
                                    <PersonIcon sx={{ color: '#000' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Full Name"
                                    secondary={user.name}
                                    primaryTypographyProps={{ variant: 'caption', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}
                                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 600, color: 'text.primary', mt: 0.5 }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 2 }}>
                                <ListItemIcon>
                                    <EmailIcon sx={{ color: '#000' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Email Address"
                                    secondary={user.email}
                                    primaryTypographyProps={{ variant: 'caption', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}
                                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 600, color: 'text.primary', mt: 0.5 }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 2 }}>
                                <ListItemIcon>
                                    <PhoneIcon sx={{ color: '#000' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Phone Number"
                                    secondary={user.phone.toString()}
                                    primaryTypographyProps={{ variant: 'caption', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}
                                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 600, color: 'text.primary', mt: 0.5 }}
                                />
                            </ListItem>

                            <ListItem sx={{ px: 0, py: 2 }}>
                                <ListItemIcon>
                                    <HomeIcon sx={{ color: '#000' }} />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Shipping Address"
                                    secondary={user.address}
                                    primaryTypographyProps={{ variant: 'caption', fontWeight: 700, color: 'text.secondary', textTransform: 'uppercase' }}
                                    secondaryTypographyProps={{ variant: 'body1', fontWeight: 600, color: 'text.primary', mt: 0.5 }}
                                />
                            </ListItem>
                        </List>

                        <Box sx={{ mt: 4, textAlign: 'right' }}>
                            <Button
                                variant="text"
                                sx={{ color: '#000', fontWeight: 700, textTransform: 'none' }}
                            >
                                Edit Information
                            </Button>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    )
}
