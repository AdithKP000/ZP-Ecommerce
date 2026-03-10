"use client"

import { useState } from "react"
import {
    Box,
    Container,
    TextField,
    Typography,
    Button,
    Checkbox,
    FormControlLabel,
    Link,
    Paper
} from "@mui/material"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"
import { User } from "@/types/UserTypes"
import { useAppDispatch } from "@/core_components/hooks/redux"
import { login } from "@/core_components/state/slices/userSlice"
import { useRouter } from "next/navigation"

export default function Signup() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const [formData, setFormData] = useState<User>({
        id: "USERID1",
        name: "",
        email: "",
        password: "",
        phone: 0,
        address: "",
    })

    const [newsletter, setNewsletter] = useState(true)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = () => {
        dispatch(login(formData))
        router.push('/user/auth/login')
    }

    return (
        <Container maxWidth="sm">
            <Box sx={{
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                py: 4
            }}>
                <Paper
                    elevation={0}
                    sx={{
                        p: { xs: 3, md: 6 },
                        width: '100%',
                        maxWidth: 480,
                        border: '1px solid #f0f0f0',
                        borderRadius: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >
                    <Typography
                        variant="h4"
                        component="h1"
                        gutterBottom
                        sx={{ fontWeight: 700, mb: 1 }}
                    >
                        Create Account
                    </Typography>

                    <Typography
                        variant="body2"
                        color="text.secondary"
                        align="center"
                        sx={{ mb: 5, maxWidth: 300 }}
                    >
                        Join the COSMO community for exclusive beauty updates.
                    </Typography>

                    <Box component="form" sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.05em' }}
                            >
                                Full Name
                            </Typography>
                            <TextField
                                fullWidth
                                name="name"
                                placeholder="Anna Smith"
                                value={formData.name}
                                onChange={handleFormChange}
                                size="small"

                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#d0d0d0' },
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.05em' }}
                            >
                                Email Address
                            </Typography>
                            <TextField
                                fullWidth
                                name="email"
                                type="email"
                                placeholder="anna@example.com"
                                value={formData.email}
                                onChange={handleFormChange}
                                variant="outlined"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#d0d0d0' },
                                    }
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.05em' }}
                            >
                                Password
                            </Typography>
                            <TextField
                                fullWidth
                                name="password"
                                type="password"
                                placeholder="........"
                                value={formData.password}
                                onChange={handleFormChange}
                                variant="outlined"
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#d0d0d0' },
                                    }
                                }}
                            />
                            <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                                Must be at least 8 characters
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.05em' }}
                            >
                                Phone
                            </Typography>
                            <TextField
                                fullWidth
                                name="phone"
                                type="tel"
                                size="small"
                                placeholder="1234567890"
                                value={formData.phone === 0 ? '' : formData.phone}
                                onChange={(e) => {
                                    const val = e.target.value.replace(/\D/g, '');
                                    setFormData(prev => ({ ...prev, phone: Number(val) }));
                                }}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#d0d0d0' },
                                    }
                                }}
                            />
                        </Box>

                        {/* Address Field */}
                        <Box>
                            <Typography
                                variant="caption"
                                sx={{ fontWeight: 700, textTransform: 'uppercase', color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.05em' }}
                            >
                                Address
                            </Typography>
                            <TextField
                                fullWidth
                                name="address"
                                multiline
                                rows={2}
                                size="small"
                                placeholder="Your full address"
                                value={formData.address}
                                onChange={handleFormChange}
                                variant="outlined"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        backgroundColor: '#f8f9fa',
                                        '& fieldset': { borderColor: '#e0e0e0' },
                                        '&:hover fieldset': { borderColor: '#d0d0d0' },
                                    }
                                }}
                            />
                        </Box>

                        {/* Newsletter Checkbox */}
                        <FormControlLabel
                            sx={{ mt: 1, alignItems: 'flex-start' }}
                            control={
                                <Checkbox
                                    checked={newsletter}
                                    onChange={(e) => setNewsletter(e.target.checked)}
                                    sx={{
                                        pt: 0,
                                        '&.Mui-checked': { color: '#000' }
                                    }}
                                />
                            }
                            label={
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                                    I'd like to receive news, beauty tips and special offers from COSMO via email.
                                </Typography>
                            }
                        />

                        <Button
                            fullWidth
                            variant="contained"
                            endIcon={<ArrowForwardIcon />}
                            onClick={handleSubmit}
                            sx={{
                                mt: 2,
                                py: 1.5,
                                backgroundColor: '#000',
                                color: '#fff',
                                textTransform: 'uppercase',
                                fontWeight: 700,
                                borderRadius: 1,
                                letterSpacing: '0.1em',
                                '&:hover': {
                                    backgroundColor: '#333'
                                }
                            }}
                        >
                            Create Account
                        </Button>

                    </Box>

                    {/* Footer Link */}
                    <Box sx={{ mt: 6, borderTop: '1px solid #f0f0f0', pt: 3, width: '100%', textAlign: 'center' }}>
                        <Typography variant="body2" color="text.secondary">
                            Already have an account?{' '}
                            <Link
                                href="/user/auth/login"
                                sx={{
                                    color: '#000',
                                    fontWeight: 700,
                                    textDecoration: 'underline',
                                    '&:hover': { color: '#333' }
                                }}
                            >
                                Log In
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Box >
        </Container >
    )
}
