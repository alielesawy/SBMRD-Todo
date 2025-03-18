import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Lock, Person, Login as LoginIcon } from '@mui/icons-material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cyberpunk.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const navigate = useNavigate();


  const handleSubmit = async () => {
    const endpoint = isRegister ? '/register' : '/login';
    try {
      const response = await axios.post(`/api/auth${endpoint}`, {
        username,
        password,
      });
      if (response.status === 200) {
        if (!isRegister) {
          localStorage.setItem('userId', response.data.userId);
          navigate('/');
        } else {
          alert('Registration successful! Please login.');
          setIsRegister(false);
        }
      }
    } catch (error) {
      alert(error.response?.data || 'Error occurred');
    }
  };

  return (
    <Container maxWidth={false} disableGutters className="cyber-login-bg">
      <Box className="cyber-container" sx={{ p: 2 }}>
        <Typography variant="h4" className="cyber-title">
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Person className="cyber-icon" />
          <TextField
            label="Username"
            fullWidth
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="cyber-textfield"
          />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
          <Lock className="cyber-icon" />
          <TextField
            label="Password"
            type="password"
            fullWidth
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="cyber-textfield"
          />
        </Box>
        <Button
          variant="contained"
          startIcon={<LoginIcon />}
          fullWidth
          className="cyber-button"
          onClick={handleSubmit}
          sx={{ mt: 2 }}
        >
          {isRegister ? 'Register' : 'Login'}
        </Button>
        <Button
          fullWidth
          className="cyber-switch-button"
          onClick={() => setIsRegister(!isRegister)}
          sx={{ mt: 1 }}
        >
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;