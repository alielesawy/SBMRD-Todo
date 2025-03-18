import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, List, ListItem, ListItemText,
  Checkbox, IconButton, Box, Tooltip
} from '@mui/material';
import { Add, Delete, CheckCircle, Logout } from '@mui/icons-material'; // Added Logout icon
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './cyberpunk.css';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [userId, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos', {
        headers: { 'User-Id': userId },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Fetch Todos Error:', error);
    }
  };

  const addTodo = async () => {
    if (title) {
      await axios.post('/api/todos', { title, completed: false }, {
        headers: { 'User-Id': userId },
      });
      setTitle('');
      fetchTodos();
    }
  };

  const toggleTodo = async (todo) => {
    await axios.put(`/api/todos/${todo.id}`, { ...todo, completed: !todo.completed }, {
      headers: { 'User-Id': userId },
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`/api/todos/${id}`, {
      headers: { 'User-Id': userId },
    });
    fetchTodos();
  };

  const handleLogout = () => {
    localStorage.removeItem('userId'); 
    navigate('/login'); 
  };

  return (
    <Container maxWidth={false} disableGutters className="cyber-todo-bg">
      <Box className="cyber-container" sx={{ p: 2, position: 'relative' }}>
        {/* Logout Button in Top-Right Corner */}
        <Tooltip title="Logout">
          <IconButton
          onClick={handleLogout}
           sx={{ position: 'absolute', top: 16, right: 16 }}
           className="cyber-logout-icon"
          >
            <Logout />
          </IconButton>
        </Tooltip>

        <Typography variant="h4" className="cyber-title">
          Cyber Todo
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            label="New Task"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="cyber-textfield"
          />
          <Button
            variant="contained"
            startIcon={<Add />}
            className="cyber-button"
            onClick={addTodo}
            sx={{ ml: 1 }}
          >
            Add
          </Button>

        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem
              key={todo.id}
              className="cyber-todo-item"
              secondaryAction={
                <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                  <Delete className="cyber-icon" />
                </IconButton>
              }
            >
              <Checkbox
                checked={todo.completed}
                onChange={() => toggleTodo(todo)}
                icon={<CheckCircle />}
                checkedIcon={<CheckCircle />}
                className="cyber-checkbox"
              />
              <ListItemText
                primary={todo.title}
                className={`cyber-todo-text ${todo.completed ? 'completed' : ''}`}
              />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default TodoList;