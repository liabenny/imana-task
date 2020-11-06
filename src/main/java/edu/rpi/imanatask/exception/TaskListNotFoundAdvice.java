package edu.rpi.imanatask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class TaskListNotFoundAdvice {
    
    @ResponseBody
    @ExceptionHandler(TaskListNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND)
    String taskListNotFoundHandler(TaskListNotFoundException ex) {
        return ex.getMessage();
    }

}
