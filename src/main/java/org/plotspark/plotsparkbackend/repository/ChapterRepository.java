package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Chapter;
import org.plotspark.plotsparkbackend.entity.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    Boolean existsByTitleAndStory(String title, Story story);

    Optional<Chapter> findOneByIdAndStory_IdAndAuthorId(Long chapterId,  Long storyId, Long authorId);

    // to avoid the N+1 problem, override the lazy load of story and user for a chapter
    @Query("SELECT c FROM Chapter c JOIN FETCH c.story s JOIN FETCH s.user WHERE c.story.id = :storyId")
    Page<Chapter> findAllByStoryIdWithDetails(Long storyId, Pageable pageable);

    @Query("SELECT c FROM Chapter c JOIN FETCH c.story s JOIN FETCH s.user u " +
            "WHERE c.id = :chapterId AND s.id = :storyId AND u.id = :authorId")
    Optional<Chapter> findChapterDetails(
            @Param("chapterId") Long chapterId,
            @Param("storyId") Long storyId,
            @Param("authorId") Long authorId
    );
}
