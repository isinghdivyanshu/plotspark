package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Chapter;
import org.plotspark.plotsparkbackend.entity.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChapterRepository extends JpaRepository<Chapter, Long> {

    Boolean existsByTitleAndStoryId(String title, Long storyId);

    Optional<Chapter> findOneByIdAndStoryIdAndStoryUserId(Long id, Long storyId, Long userId);

    Page<Chapter> findAllByStoryId(Long storyId, Pageable pageable);
}
