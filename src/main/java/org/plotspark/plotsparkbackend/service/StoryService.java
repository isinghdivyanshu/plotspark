package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.StoryResponseDto;
import org.springframework.data.domain.Pageable;

public interface StoryService {
    public StoryResponseDto createStory(StoryRequestDto storyRequestDto);

    public PagedResponseDto<StoryResponseDto> getAllStories(Pageable pageable);

    public StoryResponseDto getStoryById(Long storyId);

    public StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto);

    void deleteStoryById(Long storyId);
}
