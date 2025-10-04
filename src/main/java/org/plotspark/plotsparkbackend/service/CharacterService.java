package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterDetailResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterRequestDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterSummaryResponseDto;
import org.springframework.data.domain.Pageable;

public interface CharacterService {

    CharacterSummaryResponseDto createCharacterForStory(CharacterRequestDto characterRequestDto, Long storyId);

    CharacterDetailResponseDto getCharacterForStory(Long characterId, Long storyId);

    PagedResponseDto<CharacterSummaryResponseDto> getAllCharactersForStory(Long storyId, Pageable pageable);

    void deleteCharacterFromStory(Long characterId, Long storyId);

    CharacterSummaryResponseDto updateCharacterForStory(Long characterId, Long storyId, CharacterRequestDto characterRequestDto);
}
