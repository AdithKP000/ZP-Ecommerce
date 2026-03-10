"use client"
import { Label } from "@mui/icons-material"
import { Box, Container, FormControl, FormControlLabel, FormGroup, TextField, Paper, Typography, IconButton, Button, Checkbox } from "@mui/material"
import { User } from "@/types/UserTypes"
import ArrowForwardIcon from "@mui/icons-material/ArrowForward"

import { useState } from "react"
import Link from "next/link"
export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",

    })

    const [newsletter, setNewsletter] = useState(false)

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <div>


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
                            Welcome back!
                        </Typography>

                        <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            sx={{ mb: 5, maxWidth: 300 }}
                        >
                            Please Enter your details to sign in
                        </Typography>
                        <Box component="form" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'inline', gap: 3 }}>
                            <Button sx={{
                                p: 1,
                                px: 4,
                                m: 1,
                                border: '1px solid black',
                                '&:hover': {
                                    backgroundColor: '#f6f6f6ff'
                                }
                            }}> Google</Button>
                            <Button sx={{
                                p: 1,
                                px: 4,
                                m: 1,
                                border: '1px solid black',
                                '&:hover': {
                                    backgroundColor: '#f6f6f6ff'
                                }
                            }}>Facebook</Button>
                        </Box>
                        <hr />OR
                        <Paper
                            elevation={0}
                            sx={{
                                mt: 1,
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
                            <Box component="form" sx={{ mt: 1, width: '100%', display: 'flex', flexDirection: 'column', gap: 3 }}>
                                <Box>
                                    <Typography variant="caption"
                                        sx={{ fontWeight: 700, textTransform: "upper", color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.07em' }}>
                                        Email
                                    </Typography>
                                    <TextField
                                        name="Email"
                                        placeholder="Annasmith@gmail.com"
                                        fullWidth
                                        size="small"
                                        value={formData.email}
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

                                <Box>
                                    <Typography variant="caption"
                                        sx={{ fontWeight: 700, textTransform: "upper", color: '#5f6368', mb: 1, display: 'block', letterSpacing: '0.07em' }}>
                                        Password
                                    </Typography>
                                    <TextField
                                        name="password"
                                        type="password"
                                        fullWidth
                                        size="small"
                                        value={formData.password}
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
                            </Box>
                        </Paper>
                        <Box component="form" sx={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'inline', gap: 3 }}>

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
                                        Remember Me
                                    </Typography>
                                }
                            />
                            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                                Forgot Password?
                            </Typography>
                        </Box>
                        <Link href="/">
                            <Button
                                fullWidth
                                variant="contained"
                                endIcon={<ArrowForwardIcon />}
                                sx={{
                                    mt: 2,
                                    py: 1,
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
                                Login
                            </Button>
                        </Link>

                    </Paper>
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 0.3 }}>
                        Don't have an account? <Link href="/user/auth/signup">Sign Up</Link>
                    </Typography>
                </Box>

            </Container>

        </div >
    )
}
