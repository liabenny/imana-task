package edu.rpi.imanatask.message;

public class ErrorData {
    String message;

    public ErrorData(String error) {
        this.message = error;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getMessage() {
        return message;
    }
}
