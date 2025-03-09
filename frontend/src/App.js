import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: { main: '#FF9900' }, // AWS orange
    secondary: { main: '#232F3E' }, // AWS dark blue
    background: { default: '#F7F7F7' },
  },
  typography: {
    fontFamily: 'Amazon Ember, Roboto, sans-serif',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
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