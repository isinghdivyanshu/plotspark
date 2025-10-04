package org.plotspark.plotsparkbackend.service.impl;

import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.service.EmailService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Async
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender emailSender;
    private final TemplateEngine templateEngine;
    private static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Value("${app.frontend-base-url}")
    private String frontendBaseUrl;

    @Override
    public void sendSimpleEmail(String to, String subject, String text) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(subject);
            message.setText(text);

            emailSender.send(message);
            logger.info("Sent email to {}, subject {}", to, subject);
        }
        catch (Exception e) {
            logger.error("Error sending email to {}, {}", to, e.getMessage());
        }
    }

    @Override
    public void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables) {
        Context context = new Context();
        context.setVariables(variables);

        try {
            String htmlContent = templateEngine.process(templateName, context);

            MimeMessage mimeMessage = emailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "UTF-8");

            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            emailSender.send(mimeMessage);
            logger.info("Email sent successfully to {}", to);
        } catch (Exception e) {
            logger.error("Error sending email to {}: {}", to, e.getMessage());
        }
    }

    @Override
    public void sendVerificationEmail(String verificationToken, String email, String username) {
        String verificationUrl = frontendBaseUrl + "/verify-email?verificationToken=" +  verificationToken;

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("verificationUrl", verificationUrl);

        sendHtmlEmail(
                email,
                "Welcome to Plotspark! Please Verify Your Account",
                "verification",
                variables
        );
    }

    @Override
    public void sendPasswordResetEmail(String token, String email, String username) {
        String resetLink = frontendBaseUrl + "/reset-password?token=" + token;

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("resetUrl", resetLink);

        sendHtmlEmail(
                email,
                "Your Plotspark password reset link",
                "passwordReset",
                variables
        );
    }

    @Override
    public void sendPasswordResetConfirmationEmail(String email, String username) {
        String loginUrl = frontendBaseUrl + "/login";

        Map<String, Object> variables = new HashMap<>();
        variables.put("username", username);
        variables.put("loginUrl", loginUrl);

        sendHtmlEmail(
                email,
                "Your Plotspark Password Has Been Changed",
                "passwordResetConfirmation",
                variables
        );
    }
}
