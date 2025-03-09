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

  useEffect(() => {
    if (!userId) {
      navigate('/login');
    } else {
      fetchTodos();
    }
  }, [userId, navigate]);

  const fetchTodos = async () => {
    const response = await axios.get('http://localhost:8080/api/todos', {
      headers: { 'User-Id': userId },
    });
    setTodos(response.data);
  };

  const addTodo = async () => {
    if (title) {
      try {
      await axios.post('http://localhost:8080/api/todos', { title, completed: false }, {
        headers: { 'User-Id': userId },
      });
      setTitle('');
      fetchTodos();
    } catch (error) {
      console.error('Failed to add todo:', error);
    }
  }
  };

  const toggleTodo = async (todo) => {
    await axios.put(`http://localhost:8080/api/todos/${todo.id}`, { ...todo, completed: !todo.completed }, {
      headers: { 'User-Id': userId },
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8080/api/todos/${id}`, {
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