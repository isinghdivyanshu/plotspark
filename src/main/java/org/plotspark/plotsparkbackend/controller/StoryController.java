package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreIdRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryResponseDto;
import org.plotspark.plotsparkbackend.dto.tag.TagIdRequestDto;
import org.plotspark.plotsparkbackend.dto.tag.TagRequestDto;
import org.plotspark.plotsparkbackend.service.GenreService;
import org.plotspark.plotsparkbackend.service.StoryService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;
    private final GenreService genreService;

    // create story
    @PostMapping
    public ResponseEntity<StoryResponseDto> createStory(@Valid @RequestBody StoryRequestDto storyRequestDto) {
        StoryResponseDto storyResponseDto = storyService.createStory(storyRequestDto);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.CREATED);
    }

    // getAllStories
    @GetMapping
    public ResponseEntity<PagedResponseDto<StoryResponseDto>> getAllStories(@PageableDefault(size = 10, sort="title")Pageable pageable) {
        PagedResponseDto<StoryResponseDto> storyResponseDtos = storyService.getAllStories(pageable);

        return new ResponseEntity<>(storyResponseDtos, HttpStatus.OK);
    }

    // getStoryById
    @GetMapping("/{id}")
    public ResponseEntity<StoryResponseDto> getStoryById(@PathVariable(name = "id") Long storyId) {
        StoryResponseDto storyResponseDto = storyService.getStoryById(storyId);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.OK);
    }

    // updateStoryById
    @PutMapping("/{id}")
    public ResponseEntity<StoryResponseDto> updateStoryById(@PathVariable(name = "id") Long storyId, @Valid @RequestBody StoryRequestDto storyRequestDto) {
        StoryResponseDto storyResponseDto = storyService.updateStoryById(storyId, storyRequestDto);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.OK);
    }

    // deleteStoryById
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteStoryById(@PathVariable(name = "id") Long storyId) {
        storyService.deleteStoryById(storyId);

        return new ResponseEntity<>("Story deleted successfully", HttpStatus.OK);
    }

    // addGenreToStory
    @PostMapping("/{storyId}/genres")
    public ResponseEntity<String> addGenreToStory(@PathVariable Long storyId, @Valid @RequestBody GenreIdRequestDto genreIdRequestDto) {
        storyService.addGenreToStory(storyId, genreIdRequestDto);

        return new ResponseEntity<>("Genre added successfully", HttpStatus.OK);
    }

    // removeGenreFromStory
    @DeleteMapping("/{storyId}/genres/{genreId}")
    public ResponseEntity<String>  removeGenreFromStory(@PathVariable Long storyId, @PathVariable Long genreId) {
        storyService.removeGenreFromStory(storyId, genreId);

        return new ResponseEntity<>("Genre removed successfully", HttpStatus.OK);
    }

    // addTagToStory
    @PostMapping("/{storyId}/tags")
    public ResponseEntity<String> addTagToStory(@PathVariable Long storyId, @Valid @RequestBody TagIdRequestDto tagIdRequestDto) {
        storyService.addTagToStory(storyId, tagIdRequestDto);

        return new ResponseEntity<>("Tag added successfully", HttpStatus.OK);
    }

    // removeTagFromStory
    @DeleteMapping("/{storyId}/tags/{tagId}")
    public ResponseEntity<String> removeTagFromStory(@PathVariable Long storyId, @PathVariable Long tagId) {
        storyService.removeTagFromStory(storyId, tagId);

        return new ResponseEntity<>("Tag removed successfully", HttpStatus.OK);
    }
}
