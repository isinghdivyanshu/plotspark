package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {

    Boolean existsByName(String name);
}
