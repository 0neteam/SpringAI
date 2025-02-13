package com.java.ai.entity;

import java.time.LocalDateTime;

import org.springframework.ai.chat.client.ChatClient.CallResponseSpec;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "chat_history")
public class ChatHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String userMessage;

    @Column(nullable = false, columnDefinition = "TEXT")
    private CallResponseSpec botResponse;

    @Column(nullable = false)
    private LocalDateTime timestamp = LocalDateTime.now();

    // 기본 생성자
    public ChatHistory() {}

    public ChatHistory(String userMessage, CallResponseSpec botResponse2) {
        this.userMessage = userMessage;
        this.botResponse = botResponse2;
        this.timestamp = LocalDateTime.now();
    }

    // Getter 및 Setter
    public Long getId() { return id; }
    public String getUserMessage() { return userMessage; }
    public CallResponseSpec getBotResponse() { return botResponse; }
    public LocalDateTime getTimestamp() { return timestamp; }
}