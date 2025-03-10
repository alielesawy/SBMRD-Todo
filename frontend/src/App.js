import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import TodoList from './components/TodoList';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<TodoList />} />
    </Routes>
  );
}

export default App;