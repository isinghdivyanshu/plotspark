package org.plotspark.plotsparkbackend.repository;

import org.plotspark.plotsparkbackend.entity.PasswordResetToken;
import org.plotspark.plotsparkbackend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PasswordResetTokenRepository extends JpaRepository<PasswordResetToken, Long> {

    Optional<PasswordResetToken> findByToken(String token);

    void deleteByUser(User user);
}
