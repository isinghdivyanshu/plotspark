package org.plotspark.plotsparkbackend.dto.genre;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class GenreRequestDto {
    @NotBlank
    private String name;
}
