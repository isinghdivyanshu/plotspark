package org.plotspark.plotsparkbackend.service;

import java.util.Map;

public interface EmailService {

    void sendSimpleEmail(String to, String subject, String text);

    void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables);

    void sendVerificationEmail(String verificationToken, String email, String username);

    void sendPasswordResetEmail(String verificationToken, String email, String username);

    void sendPasswordResetConfirmationEmail(String email, String username);
}
