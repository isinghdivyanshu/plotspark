package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.story.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryResponseDto;
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
}
