package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.StoryResponseDto;

import java.util.List;

public interface StoryService {
    public StoryResponseDto createStory(StoryRequestDto storyRequestDto);

    public List<StoryResponseDto> getAllStories();

    public StoryResponseDto getStoryById(Long storyId);

    public StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto);

    void deleteStoryById(Long storyId);
}
