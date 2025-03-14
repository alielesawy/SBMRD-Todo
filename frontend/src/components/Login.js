import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      console.log('Response:', response.data);
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
      console.error('Error:', error.response?.data);
      alert(error.response?.data || 'An error occurred during ' + (isRegister ? 'registration' : 'login'));
    }
  };

  return (
    <Container maxWidth="xs">
      <Box sx={{ mt: 8, textAlign: 'center' }}>
        <Typography variant="h4" color="secondary">
          {isRegister ? 'Register' : 'Login'}
        </Typography>
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={handleSubmit}
        >
          {isRegister ? 'Register' : 'Login'}
        </Button>
        <Button
          color="secondary"
          fullWidth
          sx={{ mt: 1 }}
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Switch to Login' : 'Switch to Register'}
        </Button>
      </Box>
    </Container>
  );
}

export default Login;