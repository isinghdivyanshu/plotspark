package org.plotspark.plotsparkbackend.exception;

import org.plotspark.plotsparkbackend.dto.ErrorDetailsDto;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.AuthenticationException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger logger = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    // for business logic errors
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorDetailsDto> handleApiException(ApiException exception, WebRequest request) {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        logger.warn("Request Failed: {}", exception.getMessage(), exception);

        return new ResponseEntity<>(errorDetails, exception.getStatus());
    }

    // for input validation errors
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValidException(MethodArgumentNotValidException exception) {
        Map<String, String> errors = new HashMap<>();

        exception.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();

            errors.put(fieldName, errorMessage);
        });

        logger.warn("Validation errors occurred: {}", errors, exception);
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }

    // for errors during logging in
    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<ErrorDetailsDto> handleAuthenticationException(AuthenticationException exception, WebRequest request) {
        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                new Date(),
                exception.getMessage(),
                request.getDescription(false)
        );

        logger.warn("Request Failed: {}", exception.getMessage(), exception);
        return new ResponseEntity<>(errorDetails, HttpStatus.UNAUTHORIZED);
    }

    // global catch all for everything else
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetailsDto> handleException(Exception exception, WebRequest request) {

        ErrorDetailsDto errorDetails = new ErrorDetailsDto(
                new Date(),
                "An internal server error has occurred. Please try again later",
                request.getDescription(false)
        );

        logger.error("Internal Server Error: {}", errorDetails, exception);
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
