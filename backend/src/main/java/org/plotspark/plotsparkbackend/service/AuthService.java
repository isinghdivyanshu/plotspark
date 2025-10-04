package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.auth.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.NewPasswordDto;
import org.plotspark.plotsparkbackend.dto.auth.PasswordResetRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.RegisterRequestDto;

public interface AuthService {

    void registerUser(RegisterRequestDto registerRequest);

    String loginUser(LoginRequestDto loginRequest);

    void verifyUser(String verificationToken);

    void resendVerificationEmail(String email);

    void generateAndSendPasswordResetToken(PasswordResetRequestDto passwordResetRequestDto);

    void verifyAndResetPassword(String token, NewPasswordDto newPasswordDto);
}
