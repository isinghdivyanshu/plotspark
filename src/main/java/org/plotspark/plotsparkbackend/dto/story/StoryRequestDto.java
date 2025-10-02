package org.plotspark.plotsparkbackend.dto.story;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StoryRequestDto {
    @NotBlank
    @Size(min = 3, max = 100)
    private String title;

    @Size(max = 1500)
    private String description;
}
