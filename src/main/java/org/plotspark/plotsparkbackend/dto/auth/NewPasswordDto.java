package org.plotspark.plotsparkbackend.dto.auth;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class NewPasswordDto {
    @NotBlank(message = "New password is required")
    @Size(min = 6, message = "Password must have at least 6 characters")
    private String newPassword;

    @NotBlank
    private String confirmNewPassword;
}
