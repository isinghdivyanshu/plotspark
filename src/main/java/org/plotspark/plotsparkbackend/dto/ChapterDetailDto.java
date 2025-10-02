package org.plotspark.plotsparkbackend.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ChapterDetailDto {
    private Long id;
    private String title;
    private Long storyId;
    private String content;
}
