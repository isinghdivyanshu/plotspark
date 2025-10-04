package org.plotspark.plotsparkbackend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterDetailResponseDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterRequestDto;
import org.plotspark.plotsparkbackend.dto.character.CharacterSummaryResponseDto;
import org.plotspark.plotsparkbackend.entity.Character;
import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.CharacterRepository;
import org.plotspark.plotsparkbackend.repository.StoryRepository;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.service.CharacterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CharacterServiceImpl implements CharacterService {

    private final CharacterRepository characterRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(CharacterServiceImpl.class);

    // create new character
    @Override
    public CharacterSummaryResponseDto createCharacterForStory(CharacterRequestDto characterRequestDto, Long storyId) {
        logger.info("Creating character for story with id {}", storyId);

        User currentUser = getCurrentUser();

        Story story = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found"));

        if(characterRepository.existsByNameAndStoryId(characterRequestDto.getName(), storyId)) {
            throw new ApiException(HttpStatus.CONFLICT, "Character already exists");
        }

        Character newCharacter = new Character();
        newCharacter.setName(characterRequestDto.getName());
        newCharacter.setDescription(characterRequestDto.getDescription());
        newCharacter.setStory(story);

        characterRepository.save(newCharacter);

        logger.info("Character created with id {}", newCharacter.getId());
        return mapToSummaryDto(newCharacter);
    }

    // get character details by id for a story
    @Override
    public CharacterDetailResponseDto getCharacterForStory(Long characterId, Long storyId) {
        logger.info("Getting character for story with id {}", storyId);

        User currentUser = getCurrentUser();

        if(!storyRepository.existsByIdAndUser_Id(storyId, currentUser.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Story not found");
        }

        Character character = characterRepository.findWithDescriptionByIdAndStoryId(characterId, storyId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Character not found"));

        logger.info("Character found with id {}", character.getId());
        return mapToDetailDto(character);
    }

    // get all characters summary for a story
    @Override
    public PagedResponseDto<CharacterSummaryResponseDto> getAllCharactersForStory(Long storyId, Pageable pageable) {
        logger.info("Getting all characters for story with id {}", storyId);

        User currentUser = getCurrentUser();

        if(!storyRepository.existsByIdAndUser_Id(storyId, currentUser.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Story not found");
        }

        Page<Character> pagedCharacters = characterRepository.findAllByStoryId(storyId,  pageable);

        List<CharacterSummaryResponseDto> responseDtos = pagedCharacters.getContent().stream()
                .map(this::mapToSummaryDto)
                .toList();

        logger.info("Characters found for story with id {}", storyId);
        return new PagedResponseDto<>(
                responseDtos,
                pagedCharacters.getNumber(),
                pagedCharacters.getSize(),
                pagedCharacters.getTotalElements(),
                pagedCharacters.getTotalPages(),
                pagedCharacters.isLast()
        );
    }

    // delete character by id from a story
    @Override
    public void deleteCharacterFromStory(Long characterId, Long storyId) {
        logger.info("Deleting character from story with id {}", storyId);

        User currentUser = getCurrentUser();

        if(!storyRepository.existsByIdAndUser_Id(storyId, currentUser.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Story not found");
        }

        Character characterToDelete = characterRepository.findByIdAndStoryId(characterId, storyId)
                        .orElse(null);

        if(characterToDelete != null) {
            characterRepository.delete(characterToDelete);
            logger.info("Character deleted for story with id {}", storyId);
        }
        else {
            logger.info("Attempted to delete character for story with id {} but character not found", storyId);
        }
    }

    // update character by id in a story
    @Override
    public CharacterSummaryResponseDto updateCharacterForStory(Long characterId, Long storyId, CharacterRequestDto characterRequestDto) {
        logger.info("Updating character for story with id {}", storyId);

        User currentUser = getCurrentUser();

        if(!storyRepository.existsByIdAndUser_Id(storyId, currentUser.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Story not found");
        }

        Character characterToUpdate = characterRepository.findByIdAndStoryId(characterId, storyId)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Character not found"));

        characterToUpdate.setName(characterRequestDto.getName());
        characterToUpdate.setDescription(characterRequestDto.getDescription());

        characterRepository.save(characterToUpdate);

        logger.info("Character updated for story with id {}", storyId);
        return mapToSummaryDto(characterToUpdate);
    }

    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private CharacterSummaryResponseDto mapToSummaryDto(Character character) {
        CharacterSummaryResponseDto characterSummaryResponseDto = new CharacterSummaryResponseDto();
        characterSummaryResponseDto.setId(character.getId());
        characterSummaryResponseDto.setName(character.getName());
        characterSummaryResponseDto.setStoryId(character.getStory().getId());

        return characterSummaryResponseDto;
    }

    private CharacterDetailResponseDto mapToDetailDto(Character character) {
        CharacterDetailResponseDto characterDetailResponseDto = new CharacterDetailResponseDto();
        characterDetailResponseDto.setId(character.getId());
        characterDetailResponseDto.setName(character.getName());
        characterDetailResponseDto.setDescription(character.getDescription());
        characterDetailResponseDto.setStoryId(character.getStory().getId());

        return characterDetailResponseDto;
    }
}
