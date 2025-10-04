package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.dto.genre.GenreIdRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryRequestDto;
import org.plotspark.plotsparkbackend.dto.story.StoryResponseDto;
import org.plotspark.plotsparkbackend.dto.tag.TagIdRequestDto;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;

public interface StoryService {
    StoryResponseDto createStory(StoryRequestDto storyRequestDto);

    PagedResponseDto<StoryResponseDto> getAllStories(Pageable pageable);

    StoryResponseDto getStoryById(Long storyId);

    StoryResponseDto updateStoryById(Long storyId, StoryRequestDto storyRequestDto);

    void deleteStoryById(Long storyId);

    void addGenreToStory(Long storyId, GenreIdRequestDto genreIdRequestDto);

    void removeGenreFromStory(Long storyId, Long genreId);

    void addTagToStory(Long storyId, TagIdRequestDto tagIdRequestDto);

    void removeTagFromStory(Long storyId, Long tagId);
}
