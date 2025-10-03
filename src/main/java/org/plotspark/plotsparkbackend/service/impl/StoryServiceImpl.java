package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreIdRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryResponseDto;
import org.plotspark.plotsparkbackend.entity.Genre;
import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.GenreRepository;
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

import java.util.List;

@Service
@RequiredArgsConstructor
public class StoryServiceImpl implements StoryService {

    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private final GenreRepository genreRepository;
    private static final Logger logger = LoggerFactory.getLogger(StoryServiceImpl.class);

    // createStory
    @Override
    public StoryResponseDto createStory(StoryRequestDto storyRequestDto) {
        logger.info("Creating story with title {}", storyRequestDto.getTitle());

        // get the authenticated username and check if it exits in database
        User currentUser = getCurrentUser();

        // check if story for the user exists
        if (storyRepository.existsByTitleAndUser_Id(storyRequestDto.getTitle(), currentUser.getId())) {
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
    public PagedResponseDto<StoryResponseDto> getAllStories(Pageable pageable) {
        logger.info("Retrieving all stories for page {} with size {}", pageable.getPageNumber(), pageable.getPageSize());

        User currentUser = getCurrentUser();

        Page<Story> pagedStories = storyRepository.findAllByUser_Id(currentUser.getId(), pageable);

        List<StoryResponseDto> storyDtos = pagedStories.getContent().stream()
                .map(this::mapToDto)
                .toList();

        logger.info("All Stories retrieved.");
        return new PagedResponseDto<>(
                storyDtos,
                pagedStories.getNumber(),
                pagedStories.getSize(),
                pagedStories.getTotalElements(),
                pagedStories.getTotalPages(),
                pagedStories.isLast()
        );
    }

    // getStoriesById
    @Override
    public StoryResponseDto getStoryById(Long storyId) {
        logger.info("Retrieving story with id {}", storyId);

        User currentUser = getCurrentUser();
        
        Story story = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        logger.info("Story with id {} retrieved", storyId);
        return mapToDto(story);
    }

    // updateStoryById
    @Override
    public StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto) {
        logger.info("Updating story with id {}", storyId);

        User currentUser = getCurrentUser();

        Story  existingStory = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
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

        Story existingStory = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        storyRepository.delete(existingStory);
        logger.info("Story with id {} deleted", storyId);
    }

    // addGenreToStory
    @Override
    public void addGenreToStory(Long storyId, GenreIdRequestDto genreIdRequestDto) {
        logger.info("Adding genre {} to story with id {}", genreIdRequestDto.getId(), storyId);

        User currentUser = getCurrentUser();

        // check for association to prevent loading of all genres for a story and returns
        if (storyRepository.existsGenreAssociation(storyId, genreIdRequestDto.getId())) {
            throw new ApiException(HttpStatus.CONFLICT, "Story already has this genre.");
        }

        Story story = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));

        Genre genre = genreRepository.findById(genreIdRequestDto.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Genre not found."));

        // will trigger lazy load because we used Set, we can use List but then Data Integrity will go down
        story.getGenres().add(genre);
        storyRepository.save(story);

        logger.info("Genre {} added to story with id {}", genreIdRequestDto.getId(), storyId);
    }

    // removeGenreFromStory
    @Override
    public void removeGenreFromStory(Long storyId, Long genreId) {
        logger.info("Removing genre {} from story with id {}", genreId, storyId);

        User currentUser = getCurrentUser();
        Story story = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found."));


        Genre genreToRemove = story.getGenres().stream()
                .filter(genre -> genre.getId().equals(genreId))
                .findFirst()
                .orElse(null);

        if(genreToRemove == null) {
            logger.info("Attempted to remove genre {} from story {} but association did not exist.", genreId, storyId);
        }
        else {
            story.getGenres().remove(genreToRemove);
            storyRepository.save(story);
            logger.info("Genre {} removed from story with id {}", genreId, storyId);
        }
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
        responseDto.setUserId(story.getUser().getId());

        return responseDto;
    }
}
