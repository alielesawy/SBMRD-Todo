import React, { useState, useEffect } from 'react';
import {
  Container, Typography, TextField, Button, List, ListItem, ListItemText,
  Checkbox, IconButton, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL || ''; // Empty for proxy in production

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [userId, navigate]);

  const fetchTodos = async () => {
    try {
      const response = await axios.get(`${apiUrl}/api/todos`, {
        headers: { 'User-Id': userId },
      });
      setTodos(response.data);
    } catch (error) {
      console.error('Fetch Todos Error:', error.response?.data);
    }
  };

  const addTodo = async () => {
    if (title) {
      await axios.post(`${apiUrl}/api/todos`, { title, completed: false }, {
        headers: { 'User-Id': userId },
      });
      setTitle('');
      fetchTodos();
    }
  };

  const toggleTodo = async (todo) => {
    await axios.put(`${apiUrl}/api/todos/${todo.id}`, { ...todo, completed: !todo.completed }, {
      headers: { 'User-Id': userId },
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${apiUrl}/api/todos/${id}`, {
      headers: { 'User-Id': userId },
    });
    fetchTodos();
  };

  return (
    <Container maxWidth="md">
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" color="secondary" gutterBottom>
          Todo List
        </Typography>
        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            label="New Task"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={addTodo}>
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo) => (
            <ListItem key={todo.id} secondaryAction={
              <IconButton edge="end" onClick={() => deleteTodo(todo.id)}>
                <DeleteIcon />
              </IconButton>
            }>
              <Checkbox checked={todo.completed} onChange={() => toggleTodo(todo)} />
              <ListItemText primary={todo.title} sx={{ textDecoration: todo.completed ? 'line-through' : 'none' }} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}

export default TodoList;