package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Story;
import org.plotspark.plotsparkbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface StoryRepository extends JpaRepository<Story, Long> {

    Optional<Story> findByTitleAndUser(String title, User user);

    Optional<Story> findByIdAndUser(Long id, User user);

    List<Story> findAllByUser_Id(Long userId);

    Optional<Story> findByIdAndUser_Id(Long id, Long userId);
}
