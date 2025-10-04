package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Character;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface CharacterRepository extends JpaRepository<Character, Long> {

    boolean existsByNameAndStoryId(String name, Long storyId);

    Optional<Character> findByIdAndStoryId(Long characterId, Long storyId);

    @EntityGraph(attributePaths = {"description"})
    Optional<Character> findWithDescriptionByIdAndStoryId(Long characterId, Long storyId);

    Page<Character> findAllByStoryId(Long storyId, Pageable pageable);
}
