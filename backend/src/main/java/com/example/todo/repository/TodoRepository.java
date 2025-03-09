package com.example.todo.repository;

import com.example.todo.model.Todo;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface TodoRepository extends MongoRepository<Todo, String> {
    List<Todo> findByUserId(String userId);
    void deleteByIdAndUserId(String id, String userId);
}