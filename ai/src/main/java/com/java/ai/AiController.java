package com.java.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000") // CORS 문제 해결
public class AiController {
    
    private final ChatClient chatClient;

    public AiController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @PostMapping("/search")
    public String searchPrompt(@RequestBody AiReqDTO aiReqDTO) {
        return chatClient.prompt()
                .user("검색 요청: " + aiReqDTO.getMsg())
                .call()
                .content();
    }
}
