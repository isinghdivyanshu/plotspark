package org.plotspark.plotsparkbackend.repository;

import jakarta.validation.constraints.NotBlank;
import org.plotspark.plotsparkbackend.entity.Tag;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TagRepository extends JpaRepository<Tag, Long> {

    boolean existsByName(@NotBlank String name);
}
