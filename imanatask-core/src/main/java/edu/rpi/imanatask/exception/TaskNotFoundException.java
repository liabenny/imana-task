package edu.rpi.imanatask.exception;

public class TaskNotFoundException extends RuntimeException {

    private static final long serialVersionUID = 4855060895979648940L;

    public TaskNotFoundException(String id) {
        super("Could not find task " + id);
    }
}
