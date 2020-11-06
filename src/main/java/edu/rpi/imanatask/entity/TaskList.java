package edu.rpi.imanatask.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

@Document
public class TaskList {
    
    @Id
    private String taskListID;

    @Field("Name")
    private String name;

    public String getName() {
        return name;
    }

    public String getTaskListID() {
        return taskListID;
    }

    public void setName(String name) {
        this.name = name;
    }
}
