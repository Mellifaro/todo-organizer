package com.epam.todo.models;

public class TodoDTO {
    private Long id;
    private Boolean isFinished;

    public TodoDTO() {
    }

    public TodoDTO(Long id, Boolean isFinished) {
        this.id = id;
        this.isFinished = isFinished;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Boolean getFinished() {
        return isFinished;
    }

    public void setFinished(Boolean finished) {
        isFinished = finished;
    }
}
