package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterDetailResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterRequestDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterSummaryResponseDto;
import org.plotspark.plotsparkbackend.service.CharacterService;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/stories/{storyId}/characters")
public class CharacterController {

    private final CharacterService characterService;

    // add character to story
    @PostMapping
    public ResponseEntity<CharacterSummaryResponseDto> createCharacterForStory(@Valid @RequestBody CharacterRequestDto characterRequestDto, @PathVariable Long storyId) {
        CharacterSummaryResponseDto characterSummaryResponseDto = characterService.createCharacterForStory(characterRequestDto, storyId);

        return new ResponseEntity<>(characterSummaryResponseDto, HttpStatus.CREATED);
    }

    // get character detail by id for a story
    @GetMapping("/{characterId}")
    public ResponseEntity<CharacterDetailResponseDto> getCharacterForStory(@PathVariable Long characterId, @PathVariable Long storyId) {
        CharacterDetailResponseDto characterDetailResponseDto = characterService.getCharacterForStory(characterId, storyId);

        return new ResponseEntity<>(characterDetailResponseDto, HttpStatus.OK);
    }

    // get all character summary for a story
    @GetMapping
    public ResponseEntity<PagedResponseDto<CharacterSummaryResponseDto>> getAllCharactersForStory(@PathVariable Long storyId, Pageable pageable) {
        PagedResponseDto<CharacterSummaryResponseDto> characterSummaryResponseDto = characterService.getAllCharactersForStory(storyId, pageable);

        return new ResponseEntity<>(characterSummaryResponseDto, HttpStatus.OK);
    }

    // delete character from story
    @DeleteMapping("/{characterId}")
    public ResponseEntity<String> deleteCharacterForStory(@PathVariable Long characterId, @PathVariable Long storyId) {
        characterService.deleteCharacterFromStory(characterId, storyId);

        return new ResponseEntity<>("Character deleted successfully", HttpStatus.OK);
    }

    // update character by id in a story
    @PutMapping("/{characterId}")
    public ResponseEntity<CharacterSummaryResponseDto> updateCharacterForStory(@PathVariable Long characterId, @PathVariable Long storyId, @Valid @RequestBody CharacterRequestDto characterRequestDto) {
        CharacterSummaryResponseDto characterSummaryResponseDto = characterService.updateCharacterForStory(characterId, storyId, characterRequestDto);

        return new ResponseEntity<>(characterSummaryResponseDto, HttpStatus.OK);
    }
}
