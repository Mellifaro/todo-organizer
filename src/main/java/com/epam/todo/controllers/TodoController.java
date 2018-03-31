package com.epam.todo.controllers;

import com.epam.todo.models.Todo;
import com.epam.todo.models.TodoDTO;
import com.epam.todo.services.TodoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/todo")
public class TodoController {

    @Autowired
    private TodoService todoService;

    @GetMapping("/")
    public List<Todo> getAll(){
        return todoService.findAll();
    }

    @GetMapping("/{id}")
    public Todo getById(@PathVariable Long id){
        return todoService.findById(id);
    }

    @PostMapping(value = "/save", consumes = MediaType.APPLICATION_JSON_VALUE)
    public Todo save(@RequestBody Todo todo){
        return todoService.save(todo);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id){
        todoService.delete(id);
    }

    @PostMapping("/mark")
    public void markTask(@RequestBody TodoDTO todoDTO){
        todoService.markFinished(todoDTO.getId(), todoDTO.getFinished());
    }
}
