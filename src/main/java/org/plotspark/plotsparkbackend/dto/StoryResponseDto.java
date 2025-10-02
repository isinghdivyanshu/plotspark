package org.plotspark.plotsparkbackend.dto;

import lombok.Data;

@Data
public class StoryResponseDto {
    private Long id;
    private String title;
    private String description;
    private Long userId;
}
