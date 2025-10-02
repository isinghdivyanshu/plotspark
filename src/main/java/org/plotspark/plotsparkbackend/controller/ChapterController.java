package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.ChapterDetailDto;
import org.plotspark.plotsparkbackend.dto.ChapterRequestDto;
import org.plotspark.plotsparkbackend.dto.ChapterSummaryDto;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.service.ChapterService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/stories/{storyId}/chapters")
@RequiredArgsConstructor
public class ChapterController {

    private final ChapterService chapterService;

    // createChapter
    @PostMapping
    public ResponseEntity<ChapterSummaryDto> createChapter(@PathVariable Long storyId, @Valid @RequestBody ChapterRequestDto chapterRequestDto) {
        ChapterSummaryDto chapterSummaryDto = chapterService.createChapter(storyId, chapterRequestDto);

        return new ResponseEntity<>(chapterSummaryDto, HttpStatus.CREATED);
    }

    // getAllChapters by storyId
    @GetMapping
    public ResponseEntity<PagedResponseDto<ChapterSummaryDto>> getAllChaptersByStoryId(@PageableDefault(size = 10, sort = "title") @PathVariable Long storyId, Pageable pageable) {
        PagedResponseDto<ChapterSummaryDto> chapterSummaryDtos = chapterService.getAllChaptersByStoryId(storyId, pageable);

        return new ResponseEntity<>(chapterSummaryDtos, HttpStatus.OK);
    }

    // getChapterById
    @GetMapping("/{chapterId}")
    public ResponseEntity<ChapterDetailDto> getChapterById(@PathVariable Long storyId, @PathVariable Long chapterId) {
        ChapterDetailDto chapterDetailDto = chapterService.getChapterById(chapterId, storyId);

        return new ResponseEntity<>(chapterDetailDto, HttpStatus.OK);
    }

    // deleteChapterById
    @DeleteMapping("/{chapterId}")
    public ResponseEntity<String> deleteChapterById(@PathVariable Long storyId, @PathVariable Long chapterId) {
        chapterService.deleteChapterById(chapterId, storyId);

        return new ResponseEntity<>("Chapter deleted successfully", HttpStatus.OK);
    }

    // updateChapterById
    @PutMapping("/{chapterId}")
    public ResponseEntity<ChapterSummaryDto> updateChapterById(@PathVariable Long storyId, @PathVariable Long chapterId, @Valid @RequestBody ChapterRequestDto chapterRequestDto) {
        ChapterSummaryDto chapterSummaryDto = chapterService.updateChapterById(chapterId, storyId, chapterRequestDto);

        return new ResponseEntity<>(chapterSummaryDto, HttpStatus.OK);
    }
}
