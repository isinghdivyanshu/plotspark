package org.plotspark.plotsparkbackend.dto.character;

import lombok.Data;

@Data
public class CharacterDetailResponseDto {
    private Long id;
    private String name;
    private String description;
    private Long storyId;
}
