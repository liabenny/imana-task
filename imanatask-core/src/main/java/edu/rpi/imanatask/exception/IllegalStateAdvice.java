package edu.rpi.imanatask.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;

import edu.rpi.imanatask.message.ErrorData;

@ControllerAdvice
public class IllegalStateAdvice {

    @ResponseBody
    @ExceptionHandler(IllegalStateException.class)
    ResponseEntity<ErrorData> illegalStateHandler(IllegalStateException ex) {
        ErrorData errorMsg = new ErrorData(ex.getMessage());
        return ResponseEntity.status(HttpStatus.UNPROCESSABLE_ENTITY).body(errorMsg);
    }
}
