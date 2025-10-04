package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Story;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    Boolean existsByTitleAndUser_Id(String title, Long userId);

    Boolean existsByIdAndUser_Id(Long storyId, Long userId);

    Page<Story> findAllByUser_Id(Long userId, Pageable pageable);

    Optional<Story> findOneByIdAndUser_Id(Long storyId, Long userId);

    @Query("SELECT COUNT(s) > 0 FROM Story s JOIN s.genres g WHERE s.id = :storyId AND g.id = :genreId")
    boolean existsGenreAssociation(Long storyId, Long genreId);

    @Query("Select COUNT(s) > 0 FROM Story s JOIN s.tags t WHERE s.id = :storyId AND t.id = :tagId")
    boolean existsTagAssociation(Long storyId, Long tagId);
}
