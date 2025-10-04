package org.plotspark.plotsparkbackend.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class PasswordResetRequestDto {
    @NotBlank(message = "Email is required")
    @Email(message = "Provide a valid email")
    private String email;
}
