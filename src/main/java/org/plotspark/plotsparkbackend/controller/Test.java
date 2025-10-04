package org.plotspark.plotsparkbackend.controller;

import lombok.RequiredArgsConstructor;
import org.plotspark.plotsparkbackend.service.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class Test {

    private final EmailService emailService;

    @GetMapping
    public ResponseEntity<String> test() {
        return ResponseEntity.ok("Hello World!");
    }

    @GetMapping("/send-email")
    public ResponseEntity<String> sendTestEmail() {
        String recipientEmail = "";

        emailService.sendSimpleEmail(
                recipientEmail,
                "Test Email from Plotspark",
                "This is a test email to confirm the mailer is working."
        );

        return ResponseEntity.ok("Test email sent to " + recipientEmail + ". Please check the inbox.");
    }

    @GetMapping("/send-html-email")
    public ResponseEntity<String> sendTestHtmlEmail() {
        String recipientEmail = "";
        String subject = "Your Weekly Plotspark Update!";
        String body = "This week, we've added exciting new features for writers. Check them out now!";

        Map<String, Object> variables = new HashMap<>();
        variables.put("subject", subject);
        variables.put("body", body);

        emailService.sendHtmlEmail(
                recipientEmail,
                subject,
                "email-template",
                variables
        );

        return ResponseEntity.ok("Test HTML email sent to " + recipientEmail + ". Please check the inbox.");
    }
}
