package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.ChapterDetailDto;
import org.plotspark.plotsparkbackend.dto.ChapterRequestDto;
import org.plotspark.plotsparkbackend.dto.ChapterSummaryDto;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.springframework.data.domain.Pageable;

public interface ChapterService {
    public ChapterSummaryDto createChapter(Long storyId, ChapterRequestDto chapterRequestDto);

    public PagedResponseDto<ChapterSummaryDto> getAllChaptersByStoryId(Long storyId, Pageable pageable);

    public ChapterDetailDto getChapterById(Long chapterId, Long storyId);

    public void deleteChapterById(Long chapterId, Long storyId);

    public ChapterSummaryDto updateChapterById(Long chapterId, Long storyId, ChapterRequestDto chapterRequestDto);
}
