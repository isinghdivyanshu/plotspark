package org.plotspark.plotsparkbackend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class LoginRequestDto {
    @NotBlank(message = "Username cannot be blank.")
    @Size(min = 3, max = 20, message =  "Username must be between 3 and 20 characters.")
    private String username;

    @NotBlank(message = "Password cannot be blank.")
    @Size(min = 6, max = 40, message = "Password length must be between 6 and 20 characters.")
    private String password;
}
