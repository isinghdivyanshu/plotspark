package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.StoryResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface StoryService {
    public StoryResponseDto createStory(StoryRequestDto storyRequestDto);

    public Page<StoryResponseDto> getAllStories(Pageable pageable);

    public StoryResponseDto getStoryById(Long storyId);

    public StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto);

    void deleteStoryById(Long storyId);
}
