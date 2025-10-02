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

    Optional<Chapter> findOneByIdAndStoryIdAndStoryUserId(Long id, Long storyId, Long userId);

    Page<Chapter> findAllByStoryId(Long storyId, Pageable pageable);
}
