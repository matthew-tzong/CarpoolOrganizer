import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [companyCode, setCompanyCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!companyCode) {
      setError('Company code is required.');
      return;
    }

    try {
      const response = await api.post('/login', { companyCode });
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your company code.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" gutterBottom>Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <TextField
        label="Company Code"
        variant="outlined"
        fullWidth
        margin="normal"
        value={companyCode}
        onChange={(e) => setCompanyCode(e.target.value)}
      />
      <Button
        variant="contained"
        color="primary"
        fullWidth
        onClick={handleLogin}
        style={{ marginTop: '16px' }}
      >
        Login
      </Button>
    </Container>
  );
}

export default Login;
