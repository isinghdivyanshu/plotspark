package org.plotspark.plotsparkbackend.controller;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.auth.*;
import org.plotspark.plotsparkbackend.service.AuthService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    // register new user
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody RegisterRequestDto registerRequest) {
        authService.registerUser(registerRequest);

        return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
    }

    // login user
    @PostMapping("/login")
    public ResponseEntity<JwtAuthResponseDto> loginUser(@Valid @RequestBody LoginRequestDto loginRequest) {
        String accessToken = authService.loginUser(loginRequest);

        JwtAuthResponseDto jwtAuthResponse =  new JwtAuthResponseDto();
        jwtAuthResponse.setAccessToken(accessToken);

        return ResponseEntity.ok(jwtAuthResponse);
    }

    // verify user email
    @GetMapping("/verify")
    public ResponseEntity<String> verifyUser(@RequestParam("verificationToken") String verificationToken) {
        authService.verifyUser(verificationToken);

        return new ResponseEntity<>("User verified successfully", HttpStatus.OK);
    }

    // resend verification mail
    @PostMapping("/resend-verification")
    public ResponseEntity<String> resendVerification(@RequestParam("email") String email) {
        authService.resendVerificationEmail(email);

        return ResponseEntity.ok("A new verification email has been sent");
    }

    // generate and send password reset token
    @PostMapping("/reset-password-request")
    public ResponseEntity<String>  resetPasswordRequest(@Valid @RequestBody PasswordResetRequestDto passwordResetRequestDto) {
        authService.generateAndSendPasswordResetToken(passwordResetRequestDto);

        return new ResponseEntity<>("Password reset link sent", HttpStatus.OK);
    }

    // verify token and reset password
    @PostMapping("/reset-password")
    public ResponseEntity<String> resetPassword(@RequestParam String token, @Valid @RequestBody NewPasswordDto newPasswordDto) {
        authService.verifyAndResetPassword(token, newPasswordDto);

        return new ResponseEntity<>("Password reset successfully", HttpStatus.OK);
    }
}
