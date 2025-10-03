package org.plotspark.plotsparkbackend.service.impl;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.auth.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.RegisterRequestDto;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.security.JwtTokenProvider;
import org.plotspark.plotsparkbackend.service.AuthService;
import org.plotspark.plotsparkbackend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

    @Value("${app.frontend-base-url}")
    String frontendBaseUrl;

    // registerUser
    @Override
    public void registerUser(RegisterRequestDto registerRequest) {
        logger.info("Registering user with email: {}", registerRequest.getEmail());

        // check for duplicate username
        if (userRepository.existsByUsername(registerRequest.getUsername())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Username already exists");
        }
        // check for duplicate email
        if (userRepository.existsByEmail(registerRequest.getEmail())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Email already exists");
        }

        // create new user
        User newUser = new User();
        newUser.setUsername(registerRequest.getUsername());
        newUser.setEmail(registerRequest.getEmail());
        // hash password
        newUser.setPassword(passwordEncoder.encode(registerRequest.getPassword()));
        // set verified as false initially
        newUser.setVerified(false);
        // generate random token
        String verificationToken = UUID.randomUUID().toString();
        newUser.setVerificationToken(verificationToken);
        // set expiry to 30 min from current time
        newUser.setTokenExpiration(LocalDateTime.now().plusMinutes(30));

        // save unverified user
        userRepository.save(newUser);
        logger.info("Registration Successful: User '{}' has been registered.", newUser.getUsername());

        logger.info("Sending verification email to: {}", newUser.getEmail());

        // send verification mail just after registration
        sendVerificationEmail(verificationToken, newUser.getEmail(), newUser.getUsername());

        logger.info("Verification email sent to: {}", newUser.getEmail());
    }

    // loginUser
    @Override
    public String loginUser(LoginRequestDto loginRequest) {
        logger.info("Logging user {}", loginRequest.getUsername());

        // needs UserDetailsService bean to be configured
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        loginRequest.getUsername(),
                        loginRequest.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);

        logger.info("User {} logged in", loginRequest.getUsername());
        return jwtTokenProvider.generateToken(authentication);
    }

    // verifyUserEmail
    @Override
    public void verifyUser(String verificationToken) {
        logger.error("Verifying user {}", verificationToken);

        User user = userRepository.findOneByVerificationToken(verificationToken)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Invalid verification token"));

        if (user.getTokenExpiration().isBefore(LocalDateTime.now())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Verification link expired, request new link");
        }

        user.setVerified(true);
        user.setVerificationToken(null);
        user.setTokenExpiration(null);
        userRepository.save(user);

        logger.info("User {} verified", user.getUsername());
    }

    // resend verification link
    @Override
    public void resendVerificationEmail(String email) {
        logger.error("Resending verification email to: {}", email);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "User not found"));

        if(user.isVerified()) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "User is already verified");
        }

        // generate new token and new expiry and save
        String verificationToken = UUID.randomUUID().toString();
        user.setVerificationToken(verificationToken);
        user.setTokenExpiration(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        // resend new token
        sendVerificationEmail(verificationToken, user.getEmail(), user.getUsername());

        logger.info("Resent verification email to {}", email);
    }

    private void sendVerificationEmail(String verificationToken, String email, String username) {
        String verificationUrl = frontendBaseUrl + "/verify-email?verificationToken=" +  verificationToken;

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("verificationUrl", verificationUrl);

        emailService.sendHtmlEmail(
                email,
                "Welcome to Plotspark! Please Verify Your Account",
                "verification",
                variables
        );
    }
}
