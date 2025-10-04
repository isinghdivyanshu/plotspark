package org.plotspark.plotsparkbackend.dto.user;

import lombok.Data;

@Data
public class UserProfileDto {
    private Long id;
    private String username;
    private String email;
}
