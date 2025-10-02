package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.UserProfileDto;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.service.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private static final Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

    @Override
    public UserProfileDto getUserProfile() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        logger.info("Retrieving user profile for username {}", username);

        User currentUser = userRepository.findByUsername(username)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        UserProfileDto userProfileDto = new UserProfileDto();
        userProfileDto.setId(currentUser.getId());
        userProfileDto.setUsername(currentUser.getUsername());
        userProfileDto.setEmail(currentUser.getEmail());

        logger.info("Retrieved user profile for username {}", username);
        return userProfileDto;
    }
}
