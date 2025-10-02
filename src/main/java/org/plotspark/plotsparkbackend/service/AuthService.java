package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.auth.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.auth.RegisterRequestDto;

public interface AuthService {

    void registerUser(RegisterRequestDto registerRequest);

    String loginUser(LoginRequestDto loginRequest);
}
