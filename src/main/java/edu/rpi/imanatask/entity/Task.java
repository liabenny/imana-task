package edu.rpi.imanatask.entity;

import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class Task {

    @Id
    private String id;

    @Field("Name")
    private String name;

    @Field("Desc")
    private String description;

    @Field("Deadline")
    private Date deadline;

    @Field("IsComplete")
    private Boolean isComplete;

    @Field("TaskListId")
    private String taskListId;

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Date getDeadline() {
        return deadline;
    }

    public String getDescription() {
        return description;
    }

    public Boolean getIsComplete() {
        return isComplete;
    }

    public String getTaskListId() {
        return taskListId;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setDeadline(Date deadline) {
        this.deadline = deadline;
    }

    public void setTaskListId(String taskListId) {
        this.taskListId = taskListId;
    }

    public void setIsComplete(Boolean isComplete) {
        this.isComplete = isComplete;
    }

    public void markAsComplete() {
        this.isComplete = true;
    }
}
