package com.java.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000") // React 클라이언트와 CORS 해결
@RequestMapping(produces = "application/json; charset=UTF-8") // UTF-8 강제 적용
public class AiController {

    private final ChatClient chatClient;

    // 환경 변수를 가져오고, 없을 경우 기본값 설정
    @Value("${AI_HOST:http://localhost:11434}")
    private String aiHost;

    public AiController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    @PostMapping(value = "/search", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> searchPrompt(@RequestBody AiReqDTO aiReqDTO) {
        try {
            // AI_HOST 환경 변수 확인
            if (aiHost == null || aiHost.isEmpty()) {
                log.error("AI_HOST 환경 변수가 설정되지 않았습니다.");
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                        .body("{\"error\":\"AI_HOST 환경 변수가 설정되지 않았습니다.\"}");
            }

            log.info("검색 요청: {}", aiReqDTO.getMsg());

            // AI 모델 호출
            String response = chatClient
                    .prompt()
                    .user("검색 요청: " + aiReqDTO.getMsg())
                    .call()
                    .content();

            log.info("AI 응답: {}", response);

            // 응답 헤더 설정 (UTF-8)
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);

            return ResponseEntity.ok()
                    .headers(headers)
                    .body(response);
        } catch (Exception e) {
            log.error("AI 응답 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("{\"error\":\"AI 응답을 처리하는 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }
}
