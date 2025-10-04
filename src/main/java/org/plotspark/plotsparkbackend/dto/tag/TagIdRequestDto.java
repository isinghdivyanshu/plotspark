package org.plotspark.plotsparkbackend.dto.tag;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class TagIdRequestDto {
    @NotNull(message = "Genre id is required")
    @Positive(message = "Invalid genre id")
    private Long id;
}
