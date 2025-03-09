package com.example.todo.controller;

import com.example.todo.model.Todo;
import com.example.todo.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/todos")
public class TodoController {

    @Autowired
    private TodoRepository todoRepository;

    @GetMapping
    public List<Todo> getTodos(@RequestHeader("User-Id") String userId) {
        return todoRepository.findByUserId(userId);
    }

    @PostMapping
    public Todo addTodo(@RequestBody Todo todo, @RequestHeader("User-Id") String userId) {
        todo.setUserId(userId);
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable String id, @RequestBody Todo todo, @RequestHeader("User-Id") String userId) {
        todo.setId(id);
        todo.setUserId(userId);
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTodo(@PathVariable String id, @RequestHeader("User-Id") String userId) {
        todoRepository.deleteByIdAndUserId(id, userId);
        return ResponseEntity.ok().build();
    }
}