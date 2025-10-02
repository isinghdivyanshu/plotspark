package org.plotspark.plotsparkbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChapterSummaryDto {
    private Long id;
    private String title;
    private Long storyId;
}
