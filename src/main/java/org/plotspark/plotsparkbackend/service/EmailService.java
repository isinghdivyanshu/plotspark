package org.plotspark.plotsparkbackend.service;

import java.util.Map;

public interface EmailService {

    void sendSimpleEmail(String to, String subject, String text);

    void sendHtmlEmail(String to, String subject, String templateName, Map<String, Object> variables);
}
