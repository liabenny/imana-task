package edu.rpi.imanatask.exception;

public class TaskListNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 220764273939832262L;

    public TaskListNotFoundException(String id) {
        super("Could not find task list " + id);
    }

}
