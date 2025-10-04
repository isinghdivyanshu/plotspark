package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository  extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);

    Boolean existsByUsername(String username);

    Boolean existsByEmail(String email);

    Optional<User> findOneByVerificationToken(String verificationToken);

    Optional<User> findByEmail(String email);
}