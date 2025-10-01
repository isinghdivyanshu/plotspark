package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.StoryResponseDto;
import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.service.StoryService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/stories")
@RequiredArgsConstructor
public class StoryController {

    private final StoryService storyService;

    @PostMapping
    public ResponseEntity<StoryResponseDto> createStory(@Valid @RequestBody StoryRequestDto storyRequestDto) {
        StoryResponseDto storyResponseDto = storyService.createStory(storyRequestDto);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<StoryResponseDto>> getAllStories() {
        List<StoryResponseDto> storyResponseDtos = storyService.getAllStories();

        return new ResponseEntity<>(storyResponseDtos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<StoryResponseDto> getStoryById(@PathVariable(name = "id") Long storyId) {
        StoryResponseDto storyResponseDto = storyService.getStoryById(storyId);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<StoryResponseDto> updateStoryById(@PathVariable(name = "id") Long storyId, @Valid @RequestBody StoryRequestDto storyRequestDto) {
        StoryResponseDto storyResponseDto = storyService.updateStoryById(storyId, storyRequestDto);

        return new ResponseEntity<>(storyResponseDto, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteStoryById(@PathVariable(name = "id") Long storyId) {
        storyService.deleteStoryById(storyId);

        return new ResponseEntity<>("Story deleted successfully", HttpStatus.OK);
    }
}
