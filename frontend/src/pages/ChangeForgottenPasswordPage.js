import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
    Button, 
    TextField, 
    Box, 
    Typography, 
    Alert, 
    Paper, 
    Container, 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions,
    InputAdornment,
    IconButton
} from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axiosInstance from '../utils/axiosConfig';
import TurnstileComponent from '../components/Recaptcha';
import isValidPassword from '../utils/isValidPassword';
import API_BASE_URL from '../config';

const ChangeForgottenPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const resetToken = searchParams.get('token');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [recaptchaToken, setRecaptchaToken] = useState('');
    const [successDialogOpen, setSuccessDialogOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    useEffect(() => {
        if (!resetToken) {
            setError('Invalid or missing reset token. Please request a new password reset link.');
        }
    }, [resetToken]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError('');
        setSuccess(false);

        if (!resetToken) {
            setError('Invalid or missing reset token. Please request a new password reset link.');
            return;
        }

        if (!newPassword || !isValidPassword(newPassword)) {
            setError('New password must be at least 6 characters long and include letters, numbers, and special characters (!@$%).');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        if (!recaptchaToken) {
            setError('Please complete the verification');
            return;
        }

        try {
            setLoading(true);
            const response = await axiosInstance.post(`${API_BASE_URL}/api/auth/verify-password-reset`, {
                token: resetToken,
                newPassword,
                recaptchaToken
            });

            if (response.status === 200) {
                setSuccess(true);
                setSuccessDialogOpen(true);
            }
        } catch (error) {
            console.error('Failed to reset password:', error);
            setError(error.response?.data?.message || 'Failed to reset password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleCloseSuccessDialog = () => {
        setSuccessDialogOpen(false);
        navigate('/auth/login');
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
                        Set New Password
                    </Typography>

                    {error && (
                        <Alert severity="error" sx={{ mb: 2 }}>
                            {error}
                        </Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <TextField
                            label="New Password"
                            type={showPassword ? 'text' : 'password'}
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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

                        <TextField
                            label="Confirm New Password"
                            type={showConfirmPassword ? 'text' : 'password'}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            fullWidth
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            edge="end"
                                            sx={{ color: 'rgba(218, 165, 32, 0.7)' }}
                                        >
                                            {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
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
                            disabled={loading || !resetToken}
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
                            {loading ? 'Resetting Password...' : 'Reset Password'}
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
                    Password Reset Successful
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ textAlign: 'center', mt: 2 }}>
                        Your password has been successfully reset. You can now log in with your new password.
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
                        Go to Login
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default ChangeForgottenPasswordPage;
