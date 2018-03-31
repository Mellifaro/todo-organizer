package com.epam.todo.services;

import com.epam.todo.dao.TodoRepository;
import com.epam.todo.models.Todo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
public class TodoService {

    @Autowired
    private TodoRepository repository;

    public Todo findById(Long id){
        return repository.findOne(id);
    }

    public List<Todo> findAll(){
        return repository.findAllByOrderByIsFinished();
    }

    public Todo save(Todo todo){
        Objects.requireNonNull(todo, "Task can't be null");
        return repository.save(todo);
    }

    public void delete(Long id){
        repository.delete(id);
    }

    public Todo markFinished(Long id, boolean isFinished){
        Todo todo = findById(id);
        todo.setFinished(isFinished);
        return save(todo);
    }
}
