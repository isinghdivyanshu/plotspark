package org.plotspark.plotsparkbackend.dto.tag;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class TagRequestDto {
    @NotBlank
    private String name;
}
