import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Alert, Paper, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';

function Login() {
  const [loginCompanyCode, setLoginCompanyCode] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companyCode, setCompanyCode] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showRegister, setShowRegister] = useState(false);
  const [companyValid, setCompanyValid] = useState(false);
  const navigate = useNavigate();

  const handleCompanyCodeValidation = async () => {
    if (!loginCompanyCode) {
      setError('Company code is required.');
      return;
    }

    try {
      const response = await api.post('/companies/validate', { code: loginCompanyCode });

      if (response.data.valid) {
        localStorage.setItem('companyId', response.data.company.id);
        setCompanyValid(true);
      } else {
        setError('Invalid company code.');
      }
    } catch (error) {
      setError('Error validating company code.');
    }
  };

  const handleUserLogin = async () => {
    if (!userEmail || !userPassword) {
      setError('Email and password are required.');
      return;
    }

    try {
      const response = await api.post('/users/validate', { email: userEmail, password: userPassword });
      localStorage.setItem('userId', response.data.userId);
      navigate('/dashboard');
    } catch (error) {
      setError('Login failed. Please check your credentials.');
    }
  };

  const handleCreateUser = async () => {
    if (!userEmail || !userPassword) {
      setError('Email and password are required.');
      return;
    }

    try {
      const companyId = localStorage.getItem('companyId');
      await api.post('/users', { email: userEmail, password: userPassword, companyId: companyId });
      setSuccess('User created successfully. Please log in.');
      setUserEmail('');
      setUserPassword('');
    } catch (error) {
      setError('Failed to create user.');
    }
  };

  const handleCreateCompany = async () => {
    if (!companyName || !companyCode) {
      setError('Both company name and code are required.');
      return;
    }

    try {
      await api.post('/companies', { name: companyName, code: companyCode });
      setSuccess('Company created successfully.');
      setCompanyName('');
      setCompanyCode('');
      setShowRegister(false);
    } catch (error) {
      setError('Failed to create company.');
    }
  };

  return (
    <Container
      maxWidth="1000px" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to right, #00c6ff, #0072ff)',
        padding: 4
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 6,
          borderRadius: '12px',
          backgroundColor: '#ffffff',
          boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
          width: '100%',
          maxWidth: '1000px', 
          textAlign: 'center'
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ color: '#3f51b5', fontWeight: 'bold' }}>
          Carpool App
        </Typography>
        <Typography variant="h6" sx={{ mb: 4, color: '#555' }}>
          Welcome! Please log in or register to get started.
        </Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        {!companyValid ? (
          <>
            <TextField
              label="Company Code"
              variant="outlined"
              fullWidth
              margin="normal"
              value={loginCompanyCode}
              onChange={(e) => setLoginCompanyCode(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleCompanyCodeValidation}
              sx={{ mb: 2, fontSize: '16px', padding: '12px' }}
            >
              Validate Company Code
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={() => setShowRegister(!showRegister)}
              sx={{ mb: 2, fontSize: '16px', padding: '12px' }}
            >
              {showRegister ? 'Cancel Registration' : 'Register Company'}
            </Button>

            {showRegister && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Register Company
                </Typography>
                <TextField
                  label="Company Name"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  label="Company Code"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={companyCode}
                  onChange={(e) => setCompanyCode(e.target.value)}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  fullWidth
                  onClick={handleCreateCompany}
                  sx={{ fontSize: '16px', padding: '12px' }}
                >
                  Create Company
                </Button>
              </Box>
            )}
          </>
        ) : (
          <>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Login or Create User
            </Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={handleUserLogin}
              sx={{ mb: 2, fontSize: '16px', padding: '12px' }}
            >
              Log In
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              onClick={handleCreateUser}
              sx={{ fontSize: '16px', padding: '12px' }}
            >
              Create User
            </Button>
          </>
        )}
      </Paper>
    </Container>
  );
}

export default Login;
