package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.JwtAuthResponseDto;
import org.plotspark.plotsparkbackend.dto.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.RegisterRequestDto;
import org.plotspark.plotsparkbackend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequest) {
        authService.registerUser(registerRequest);

        return ResponseEntity.ok("User registered successfully.");
    }

    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> loginUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        String accessToken = authService.loginUser(loginRequest);

        JwtAuthResponseDto jwtAuthResponse =  new JwtAuthResponseDto();
        jwtAuthResponse.setAccessToken(accessToken);

        return ResponseEntity.ok(jwtAuthResponse);
    }
}
