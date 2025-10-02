package org.plotspark.plotsparkbackend.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ChapterDetailDto {
    @NotBlank
    private Long id;

    @NotBlank
    private String title;

    @NotBlank
    private String content;

    @NotBlank
    private String story;

    @NotBlank
    private String author;
}
