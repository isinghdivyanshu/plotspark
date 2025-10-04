package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.chapter.ChapterDetailDto;
import org.plotspark.plotsparkbackend.dto.chapter.ChapterRequestDto;
import org.plotspark.plotsparkbackend.dto.chapter.ChapterSummaryDto;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.springframework.data.domain.Pageable;

public interface ChapterService {
    ChapterSummaryDto createChapter(Long storyId, ChapterRequestDto chapterRequestDto);

    PagedResponseDto<ChapterSummaryDto> getAllChaptersByStoryId(Long storyId, Pageable pageable);

    ChapterDetailDto getChapterById(Long chapterId, Long storyId);

    void deleteChapterById(Long chapterId, Long storyId);

    ChapterSummaryDto updateChapterById(Long chapterId, Long storyId, ChapterRequestDto chapterRequestDto);
}
