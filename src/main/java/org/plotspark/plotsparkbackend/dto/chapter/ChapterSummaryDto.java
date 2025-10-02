package org.plotspark.plotsparkbackend.dto.chapter;

import lombok.Data;

@Data
public class ChapterSummaryDto {
    private Long id;
    private String title;
    private Long storyId;
}
