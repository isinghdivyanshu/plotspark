package org.plotspark.plotsparkbackend.service.impl;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.dto.auth.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.NewPasswordDto;
import org.plotspark.plotsparkbackend.dto.auth.PasswordResetRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.RegisterRequestDto;
import org.plotspark.plotsparkbackend.entity.PasswordResetToken;
import org.plotspark.plotsparkbackend.entity.User;
import org.plotspark.plotsparkbackend.exception.ApiException;
import org.plotspark.plotsparkbackend.repository.PasswordResetTokenRepository;
import org.plotspark.plotsparkbackend.repository.UserRepository;
import org.plotspark.plotsparkbackend.security.JwtTokenProvider;
import org.plotspark.plotsparkbackend.service.AuthService;
import org.plotspark.plotsparkbackend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.util.Base64;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider jwtTokenProvider;
    private final EmailService emailService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private static final Logger logger = LoggerFactory.getLogger(AuthServiceImpl.class);

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
        String hashToken = getHashedToken(verificationToken);
        newUser.setVerificationToken(hashToken);
        // set expiry to 30 min from current time
        newUser.setTokenExpiration(LocalDateTime.now().plusMinutes(30));

        // save unverified user
        userRepository.save(newUser);
        logger.info("Registration Successful: User '{}' has been registered.", newUser.getUsername());

        logger.info("Sending verification email to: {}", newUser.getEmail());

        // send verification mail just after registration
        emailService.sendVerificationEmail(verificationToken, newUser.getEmail(), newUser.getUsername());

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

        String hashedToken = getHashedToken(verificationToken);

        User user = userRepository.findOneByVerificationToken(hashedToken)
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
        String hashedToken = getHashedToken(verificationToken);
        user.setVerificationToken(hashedToken);
        user.setTokenExpiration(LocalDateTime.now().plusMinutes(30));
        userRepository.save(user);

        // resend new token
        emailService.sendVerificationEmail(verificationToken, user.getEmail(), user.getUsername());

        logger.info("Resent verification email to {}", email);
    }

    // generate a password reset token and mail to user
    @Override
    @Transactional
    public void generateAndSendPasswordResetToken(PasswordResetRequestDto passwordResetRequestDto) {
        logger.info("Generating password reset token for user {}", passwordResetRequestDto.getEmail());

        userRepository.findByEmail(passwordResetRequestDto.getEmail())
                .ifPresent(user -> {
                    passwordResetTokenRepository.deleteByUser(user);
                    logger.info("Invalidated existing tokens for user {}", user.getEmail());

                    passwordResetTokenRepository.deleteByUser(user);

                    String rawToken = UUID.randomUUID().toString();
                    String hashedToken = getHashedToken(rawToken);

                    PasswordResetToken passwordResetToken = new PasswordResetToken();
                    passwordResetToken.setToken(hashedToken);
                    passwordResetToken.setExpiryTimeStamp(LocalDateTime.now().plusMinutes(30));
                    passwordResetToken.setUser(user);
                    passwordResetTokenRepository.save(passwordResetToken);
                    logger.info("New password reset token generated for user {}", user.getEmail());

                    emailService.sendPasswordResetEmail(rawToken, user.getEmail(), user.getUsername());
                    logger.info("Password reset email sent to {}", user.getEmail());
                });
    }

    // verify token and update password
    @Override
    @Transactional
    public void verifyAndResetPassword(String token, NewPasswordDto newPasswordDto) {
        logger.info("Resetting password");

        if(!newPasswordDto.getNewPassword().equals(newPasswordDto.getConfirmNewPassword())) {
            throw new ApiException(HttpStatus.BAD_REQUEST, "Passwords do not match");
        }

        String hashedToken = getHashedToken(token);

        PasswordResetToken passwordResetToken = passwordResetTokenRepository.findByToken(hashedToken)
                .orElseThrow(() -> new ApiException(HttpStatus.NOT_FOUND, "Invalid token"));

        if(passwordResetToken.getExpiryTimeStamp().isBefore(LocalDateTime.now())) {
            passwordResetTokenRepository.delete(passwordResetToken);
            throw new ApiException(HttpStatus.BAD_REQUEST, "Password reset link expired, request new link");
        }

        User user = passwordResetToken.getUser();
        user.setPassword(passwordEncoder.encode(newPasswordDto.getNewPassword()));
        userRepository.save(user);
        passwordResetTokenRepository.delete(passwordResetToken);
        logger.info("Password reset complete for user {}", user.getUsername());

        logger.info("Sending confirmation email to: {}", user.getEmail());
        emailService.sendPasswordResetConfirmationEmail(user.getEmail(), user.getUsername());
        logger.info("Confirmation email sent to {}", user.getEmail());
    }

    private String getHashedToken(String token) {
        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] hash = md.digest(token.getBytes(StandardCharsets.UTF_8));

            return Base64.getEncoder().withoutPadding().encodeToString(hash);
        }
        catch(NoSuchAlgorithmException e) {
            throw new RuntimeException("Could not hash token", e);
        }
    }
}
