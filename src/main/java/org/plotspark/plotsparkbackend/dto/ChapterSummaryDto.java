package org.plotspark.plotsparkbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChapterSummaryDto {
    @NotBlank
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String story;

    @NotBlank
    private String author;
}
