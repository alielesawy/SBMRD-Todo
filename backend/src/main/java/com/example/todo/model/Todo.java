package com.example.todo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "todos")
public class Todo {
    @Id
    private String id;
    private String userId;
    private String title;
    private boolean completed;

    // Getters, setters, and constructors
}