package com.epam.todo.models;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Table(name = "todo")
public class Todo {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id")
    private Long id;

    @Column(name = "task")
    private String task;

    @Column(name = "is_finished")
    private boolean isFinished;

    public Todo() {
    }

    public Todo(String task, boolean isFinished) {
        this.task = task;
        this.isFinished = isFinished;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTask() {
        return task;
    }

    public void setTask(String task) {
        this.task = task;
    }

    public boolean isFinished() {
        return isFinished;
    }

    public void setFinished(boolean finished) {
        isFinished = finished;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Todo todo = (Todo) o;
        return isFinished == todo.isFinished &&
                Objects.equals(id, todo.id) &&
                Objects.equals(task, todo.task);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id, task, isFinished);
    }

    @Override
    public String toString() {
        return "Todo{" +
                "id=" + id +
                ", task='" + task + '\'' +
                ", isFinished=" + isFinished +
                '}';
    }
}
