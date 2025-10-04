package org.plotspark.plotsparkbackend.dto.genre;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class GenreIdRequestDto {
    @NotNull(message = "Genre id is required")
    @Positive(message = "Invalid genre id")
    private Long id;
}
