package com.java.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AiController {
    
    private final ChatClient chatClient;

    public AiController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @GetMapping("/")
    public String home() {
        return chatClient.prompt().user("안녕!").call().content();
    }

    @PostMapping("/ai")
    public String ai(@RequestBody AiReqDTO aiReqDTO) {
        return chatClient.prompt().user(aiReqDTO.getMsg()).call().content();
    }

}
