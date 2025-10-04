package org.plotspark.plotsparkbackend.dto.character;

import lombok.Data;

@Data
public class CharacterSummaryResponseDto {
    private Long id;
    private String name;
    private Long StoryId;
}
