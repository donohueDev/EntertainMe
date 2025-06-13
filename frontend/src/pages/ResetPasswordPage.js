import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Alert, Paper, Container, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import axiosInstance from '../utils/axiosConfig';
import TurnstileComponent from '../components/Recaptcha';
import API_BASE_URL from '../config';

const ResetPasswordPage = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');

        if (!email) {
            setError('Please enter your email address');
            return;
        }

        if (!recaptchaToken) {
            setError('Please complete the verification');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post(`${API_BASE_URL}/api/auth/forgot-password`, {
                email,
                recaptchaToken
            });

            if (response.status === 200) {
                setSuccessDialogOpen(true);
                setEmail('');
                setRecaptchaToken('');
            }
        } catch (error) {
            console.error('Failed to send reset link:', error);
            setError(error.response?.data?.message || 'Failed to send reset link. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ 
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <Paper elevation={3} sx={{ p: 4, bgcolor: '#051426', border: '1px solid rgba(218, 165, 32, 0.3)' }}>
                    <Typography variant="h4" component="h1" gutterBottom align="center" sx={{ 
                        color: 'goldenrod',
                        mb: 4
                    }}>
                        Reset Password
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="Email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            fullWidth
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    '& fieldset': { borderColor: 'rgba(218, 165, 32, 0.5)' },
                                    '&:hover fieldset': { borderColor: 'goldenrod' },
                                    '&.Mui-focused fieldset': { borderColor: 'goldenrod' }
                                },
                                '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
                                '& .MuiOutlinedInput-input': { color: '#FFFFFF' }
                            }}
                        />

                        <TurnstileComponent
                            onVerify={(token) => setRecaptchaToken(token)}
                            onExpire={() => setRecaptchaToken('')}
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                            sx={{
                                mt: 2,
                                color: '#FFFFFF',
                                border: '1px solid rgba(218, 165, 32, 0.5)',
                                backgroundColor: '#051426',
                                '&:hover': {
                                    backgroundColor: '#051426',
                                    border: '1px solid goldenrod',
                                    boxShadow: '0 0 5px rgba(218, 165, 32, 0.5)'
                                }
                            }}
                        >
                            {loading ? 'Sending Reset Link...' : 'Send Reset Link'}
                        </Button>
                    </Box>
                </Paper>
            </Box>

            <Dialog 
                open={successDialogOpen} 
                onClose={handleCloseSuccessDialog}
                PaperProps={{
                    sx: {
                        bgcolor: '#051426',
                        border: '1px solid rgba(218, 165, 32, 0.3)',
                        color: '#FFFFFF'
                    }
                }}
            >
                <DialogTitle sx={{ color: 'goldenrod' }}>
                    Reset Link Sent
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        If an account with that email exists, a password reset link has been sent.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button 
                        onClick={handleCloseSuccessDialog}
                        sx={{ 
                            color: 'goldenrod',
                            '&:hover': {
                                backgroundColor: 'rgba(218, 165, 32, 0.1)'
                            }
                        }}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ResetPasswordPage;