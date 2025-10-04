package org.plotspark.plotsparkbackend.dto.character;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

@Data
public class CharacterRequestDto {
    @NotBlank
    private String name;

    @NotNull
    private String description;
}
