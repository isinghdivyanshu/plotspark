package org.plotspark.plotsparkbackend.dto.story;

import lombok.Data;

@Data
public class StoryResponseDto {
    private Long id;
    private String title;
    private String description;
    private Long userId;
}
