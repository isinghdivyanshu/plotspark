package org.plotspark.plotsparkbackend.service;

import org.plotspark.plotsparkbackend.dto.LoginRequestDto;
import org.plotspark.plotsparkbackend.dto.RegisterRequestDto;

public interface AuthService {

    void registerUser(RegisterRequestDto registerRequest);

    String loginUser(LoginRequestDto loginRequest);
}
