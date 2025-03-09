import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css'; // Import the custom CSS file

const theme = createTheme({
  palette: {
    primary: { main: '#0d1117' }, // Dark background
    secondary: { main: '#58a6ff' }, // Accent color
    background: { default: '#0d1117' }, // Dark background
    text: { primary: '#c9d1d9', secondary: '#8b949e' }, // Light text
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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