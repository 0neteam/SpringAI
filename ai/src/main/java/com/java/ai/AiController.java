package com.java.ai;

import java.util.List;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.client.ChatClient.CallResponseSpec;
import org.springframework.web.bind.annotation.*;

import com.java.ai.entity.ChatHistory;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class AiController {
    private final ChatClient chatClient;
    private final ChatHistoryRepository chatHistoryRepository;

    public AiController(ChatClient.Builder chatClient, ChatHistoryRepository chatHistoryRepository) {
        this.chatClient = chatClient.build();
        this.chatHistoryRepository = chatHistoryRepository;
    }

    // AI 응답 처리 및 대화 기록 저장
    @PostMapping("/search")
    public CallResponseSpec searchPrompt(@RequestBody AiReqDTO aiReqDTO) {
        String userMessage = aiReqDTO.getMsg();
        CallResponseSpec botResponse = chatClient.prompt().user(userMessage).call();

        // DB에 저장
        ChatHistory chatHistory = new ChatHistory(userMessage, botResponse);
        chatHistoryRepository.save(chatHistory);

        return botResponse;
    }

    // 최근 10개 대화 기록 조회 API
    @GetMapping("/history")
    public List<ChatHistory> getChatHistory() {
        return chatHistoryRepository.findTop10ByOrderByTimestampDesc();
    }
}