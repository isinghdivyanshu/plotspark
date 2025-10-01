package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.StoryResponseDto;
import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.StoryRepository;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.service.StoryService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(StoryServiceImpl.class);

    // createStory
    @Override
    public StoryResponseDto createStory(StoryRequestDto storyRequestDto) {
        logger.info("Creating story with title {}", storyRequestDto.getTitle());

        // get the authenticated username and check if it exits in database
        User currentUser = getCurrentUser();

        // check if story for the user exists
        Optional<Story> existingStory = storyRepository.findByTitleAndUser(storyRequestDto.getTitle(), currentUser);

        if(existingStory.isPresent()) {
            throw new ApiException(HttpStatus.CONFLICT, "Story with same title already exists.");
        }

        Story newStory = new Story();
        newStory.setTitle(storyRequestDto.getTitle());
        newStory.setDescription(storyRequestDto.getDescription());
        newStory.setUser(currentUser);

        storyRepository.save(newStory);

        logger.info("Story {} created", storyRequestDto.getTitle());
        return mapToDto(newStory);
    }

    // getAllStories
    @Override
    public Page<StoryResponseDto> getAllStories(Pageable pageable) {
        logger.info("Retrieving all stories for page {} with size {}", pageable.getPageNumber(), pageable.getPageSize());

        User currentUser = getCurrentUser();

        Page<Story> stories = storyRepository.findAllByUser_Id(currentUser.getId(), pageable);

        logger.info("All Stories retrieved.");
        return stories.map(this::mapToDto);
    }

    // getStoriesById
    @Override
    public StoryResponseDto getStoryById(Long storyId) {
        logger.info("Retrieving story with id {}", storyId);

        User currentUser = getCurrentUser();
        
        Story story = storyRepository.findByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        logger.info("Story with id {} retrieved", storyId);
        return mapToDto(story);
    }

    // updateStoryById
    @Override
    public StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto) {
        logger.info("Updating story with id {}", storyId);

        User currentUser = getCurrentUser();

        Story  existingStory = storyRepository.findByIdAndUser_Id(storyId, currentUser.getId())
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        existingStory.setTitle(storyRequestDto.getTitle());
        existingStory.setDescription(storyRequestDto.getDescription());

        storyRepository.save(existingStory);

        logger.info("Story with id {} updated", storyId);
        return mapToDto(existingStory);
    }

    // deleteStoryById
    @Override
    public void deleteStoryById(Long storyId) {
        logger.info("Deleting story with id {}", storyId);

        User currentUser = getCurrentUser();

        Story existingStory = storyRepository.findByIdAndUser(storyId, currentUser)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        logger.info("Story with id {} deleted", storyId);
        storyRepository.delete(existingStory);
    }

    // get the authenticated username and check if it exits in database
    private User getCurrentUser() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found."));
    }

    private StoryResponseDto mapToDto(Story story) {
        StoryResponseDto responseDto = new StoryResponseDto();
        responseDto.setId(story.getId());
        responseDto.setTitle(story.getTitle());
        responseDto.setDescription(story.getDescription());
        responseDto.setUser(story.getUser().getUsername());
        return responseDto;
    }

}
