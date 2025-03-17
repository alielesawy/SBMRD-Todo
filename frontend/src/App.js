import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Login';
import TodoList from './TodoList';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import './cyberpunk.css';

const cyberpunkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#00ffcc' },
    secondary: { main: '#ff00ff' },
  },
  typography: {
    fontFamily: 'Orbitron, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={cyberpunkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TodoList />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;