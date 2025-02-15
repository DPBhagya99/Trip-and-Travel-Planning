import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, TextField, Button, Typography, Alert, CircularProgress } from '@mui/material';

export default function VerifyEmail() {
  const location = useLocation();
  const navigate = useNavigate();
  const [code, setCode] = useState(new Array(6).fill(''));
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = location.state?.email;

  const handleChange = (e, index) => {
    const value = e.target.value.slice(-1); // Ensure only one character is entered
    if (!/^\d$/.test(value) && value !== '') return; // Allow only numeric inputs
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Automatically focus the next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`digit-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const prevInput = document.getElementById(`digit-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const verificationCode = code.join(''); // Combine the digits into a single string
      const response = await fetch('/api/users/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: verificationCode }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error);
      }

      setSuccess(true);
      alert('Email verified successfully!');
      navigate('/login');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 2,
        backgroundColor: '#f5f5f5',
      }}
    >
      <Typography variant="h4" component="h1" sx={{ mb: 2 , fontFamily: 'poppins', fontWeight: 700}}>
        Verify Email
      </Typography>
      <Typography variant="body1" sx={{ mb: 4, textAlign: 'center' ,fontFamily: 'poppins'}}>
        Enter the 6-digit code sent to your email: <strong>{email}</strong>
      </Typography>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <Box sx={{ display: 'flex', gap: 1 }}>
          {code.map((digit, index) => (
            <TextField
              key={index}
              id={`digit-${index}`}
              value={digit}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleBackspace(e, index)}
              inputProps={{
                maxLength: 1,
                style: {
                  textAlign: 'center',
                  fontSize: '24px',
                  width: '40px',
                  height: '50px',
                },
              }}
              variant="outlined"
            />
          ))}
        </Box>

        {error && (
          <Alert severity="error" sx={{ width: '100%', maxWidth: 400 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ width: '100%', maxWidth: 400 }}>
            Email verified successfully!
          </Alert>
        )}

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={loading}
          sx={{
            fontSize: '16px',
            fontWeight: 'bold',
            padding: '10px 20px',
            width: '200px',
          }}
        >
          {loading ? <CircularProgress size={24} sx={{ color: '#fff' }} /> : 'Verify'}
        </Button>
      </Box>
    </Box>
  );
}
