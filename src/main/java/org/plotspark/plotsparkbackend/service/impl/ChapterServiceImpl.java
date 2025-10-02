package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.chapter.ChapterDetailDto;
import org.plotspark.plotsparkbackend.dto.chapter.ChapterRequestDto;
import org.plotspark.plotsparkbackend.dto.chapter.ChapterSummaryDto;
import org.plotspark.plotsparkbackend.dto.PagedResponseDto;
import org.plotspark.plotsparkbackend.entity.Chapter;
import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.ChapterRepository;
import org.plotspark.plotsparkbackend.repository.StoryRepository;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.service.ChapterService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChapterServiceImpl implements ChapterService {

    private final ChapterRepository chapterRepository;
    private final StoryRepository storyRepository;
    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(ChapterServiceImpl.class);

    // create new chapter
    @Override
    public ChapterSummaryDto createChapter(Long storyId, ChapterRequestDto chapterRequestDto) {
        logger.info("Creating a chapter with title: {}", chapterRequestDto.getTitle());

        User currentUser = getCurrentUser();

        Story story = storyRepository.findOneByIdAndUser_Id(storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Story not found"));

        if (chapterRepository.existsByTitleAndStory(chapterRequestDto.getTitle(), story)) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Chapter already exists");
        }

        Chapter newChapter = new Chapter();
        newChapter.setTitle(chapterRequestDto.getTitle());
        newChapter.setContent(chapterRequestDto.getContent());
        newChapter.setStory(story);

        chapterRepository.save(newChapter);

        logger.info("Created a chapter with title: {}", chapterRequestDto.getTitle());
        return mapToSummaryDto(newChapter);
    }

    // get all chapters for a story by storyId
    @Override
    @Transactional(readOnly = true) // even though we are not fetching any lazy column, Page might interfere sometimes
    // @Transactional considers the whole method as single unit and rolls back if any error happen
    public PagedResponseDto<ChapterSummaryDto> getAllChaptersByStoryId(Long storyId, Pageable pageable) {
        logger.info("Retrieving chapters by story id {}", storyId);

        User currentUser = getCurrentUser();

        if (!storyRepository.existsByIdAndUser_Id(storyId, currentUser.getId())) {
            throw new ApiException(HttpStatus.NOT_FOUND, "Story not found");
        }

        Page<Chapter> pagedChapters = chapterRepository.findAllByStoryId(storyId, pageable);

        List<ChapterSummaryDto> chaptersDto = pagedChapters.getContent().stream()
                .map(this::mapToSummaryDto)
                .toList();

        logger.info("Retrieved chapters by story id {}", storyId);
        return new PagedResponseDto<>(
                chaptersDto,
                pagedChapters.getNumber(),
                pagedChapters.getSize(),
                pagedChapters.getTotalElements(),
                pagedChapters.getTotalPages(),
                pagedChapters.isLast()

        );
    }

    // getChapterById
    @Override
    @Transactional(readOnly = true) // because content is @Lob and fetched lazily, this keeps db session open
    public ChapterDetailDto getChapterById(Long chapterId, Long storyId) {
        logger.info("Retrieving chapter by id {}", chapterId);

        User currentUser = getCurrentUser();

        Chapter chapter = chapterRepository.findOneByIdAndStoryIdAndStoryUserId(chapterId, storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Chapter not found"));

        logger.info("Retrieved chapter by id {}", chapterId);
        return mapToDetailDto(chapter);
    }

    // deleteChapterById
    @Override
    @Transactional // don't know why unable to access lob stream error is happening
    public void deleteChapterById(Long chapterId, Long storyId) {
        logger.info("Deleting chapter by id {}", chapterId);

        User currentUser = getCurrentUser();

        Chapter chapter = chapterRepository.findOneByIdAndStoryIdAndStoryUserId(chapterId, storyId, currentUser.getId())
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Chapter not found"));

        chapterRepository.delete(chapter);
        logger.info("Deleted chapter by id {}", chapterId);
    }

    // updateChapterById
    @Override
    @Transactional
    public ChapterSummaryDto updateChapterById(Long chapterId, Long storyId, ChapterRequestDto chapterRequestDto) {
        logger.info("Updating chapter by id {}", chapterId);

        User currentUser = getCurrentUser();

        Chapter oldChapter = chapterRepository.findOneByIdAndStoryIdAndStoryUserId(chapterId, storyId, currentUser.getId())
                        .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Chapter not found"));

        oldChapter.setTitle(chapterRequestDto.getTitle());
        oldChapter.setContent(chapterRequestDto.getContent());

        chapterRepository.save(oldChapter);

        logger.info("Updated chapter by id {}", chapterId);
        return mapToSummaryDto(oldChapter);
    }

    private User getCurrentUser() {
        logger.info("Getting current user");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();

        return userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));
    }

    private ChapterSummaryDto mapToSummaryDto(Chapter chapter) {
        ChapterSummaryDto chapterSummaryDto = new ChapterSummaryDto();
        chapterSummaryDto.setId(chapter.getId());
        chapterSummaryDto.setTitle(chapter.getTitle());
        chapterSummaryDto.setStoryId(chapter.getStory().getId());

        return chapterSummaryDto;
    }

    private ChapterDetailDto mapToDetailDto(Chapter chapter) {
        ChapterDetailDto chapterDetailDto = new ChapterDetailDto();
        chapterDetailDto.setId(chapter.getId());
        chapterDetailDto.setTitle(chapter.getTitle());
        chapterDetailDto.setStoryId(chapter.getStory().getId());
        chapterDetailDto.setContent(chapter.getContent());

        return chapterDetailDto;
    }
}
