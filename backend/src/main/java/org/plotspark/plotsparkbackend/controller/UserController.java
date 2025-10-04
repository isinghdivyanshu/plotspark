package org.plotspark.plotsparkbackend.controller;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.user.UserProfileDto;
import org.plotspark.plotsparkbackend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @GetMapping("/me")
    public ResponseEntity<UserProfileDto> getCurrentUser() {
        UserProfileDto userProfileDto = userService.getUserProfile();

        return ResponseEntity.ok(userProfileDto);
    }
}
