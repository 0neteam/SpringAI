package com.java.ai;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Slf4j
@RestController
@CrossOrigin(origins = "http://localhost:3000") // React와 CORS 문제 해결
@RequestMapping(produces = MediaType.APPLICATION_JSON_VALUE) // UTF-8 강제 적용
public class AiController {

    private final ChatClient chatClient;

    @Value("${AI_HOST:http://localhost:11434}") // AI 모델 호스트 설정
    private String aiHost;

    public AiController(ChatClient.Builder chatClient) {
        this.chatClient = chatClient.build();
    }

    /**
     * ✅ 검색 요청 처리
     */
    @PostMapping(value = "/search", consumes = "application/json", produces = "application/json; charset=UTF-8")
    public ResponseEntity<String> searchPrompt(@RequestBody Map<String, String> request) {
        try {
            // 검색어 검증
            if (!request.containsKey("msg") || request.get("msg").trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .contentType(MediaType.APPLICATION_JSON)
                        .body("{\"error\":\"검색어가 필요합니다.\"}");
            }

            String query = request.get("msg").trim();
            log.info("검색 요청: {}", query);

            // AI 모델 호출
            String response = chatClient
                    .prompt()
                    .user("검색 요청: " + query)
                    .call()
                    .content();

            log.info("AI 응답: {}", response);

            // JSON 형식 변환 (한글 깨짐 방지)
            String jsonResponse = String.format("{\"result\": \"%s\"}", 
                    response.replaceAll("\n", " ").replaceAll("\"", "\\\""));

            return ResponseEntity.ok()
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(jsonResponse);

        } catch (Exception e) {
            log.error("AI 응답 처리 중 오류 발생", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body("{\"error\":\"AI 응답을 처리하는 중 오류 발생: " + e.getMessage() + "\"}");
        }
    }

    /**
     * ✅ 자동완성 추천 API
     */
    @GetMapping(value = "/suggest", produces = "application/json; charset=UTF-8")
    public ResponseEntity<List<String>> getSuggestions(@RequestParam("query") String query) {
        if (query.trim().isEmpty()) {
            return ResponseEntity.badRequest().body(List.of("검색어를 입력하세요."));
        }

        log.info("자동완성 요청: {}", query);

        // 미리 정의된 추천 검색어 리스트
       // 미리 정의된 추천 검색어 리스트
List<String> predefinedSuggestions = Arrays.asList(
    // 기존 항목
    "디스코드 기능",
    "React 상태 관리",
    "Spring Boot 시작하기",
    "챗봇 개발 방법",
    "AI 검색 엔진",
    "자동완성 기능 구현",
    
    // 추가 항목
    "Python 웹 크롤링",
    "JavaScript 비동기 처리",
    "React Hooks 사용법",
    "Node.js 서버 구축",
    "Vue.js와 React 비교",
    "Django와 Flask 차이",
    "MySQL vs PostgreSQL 성능 비교",
    "MongoDB 사용법",
    "JWT 인증 방식",
    "OAuth2 인증 적용",
    "TypeScript와 JavaScript 차이",
    "REST API 설계 원칙",
    "GraphQL 기본 개념",
    "Docker 컨테이너 개념",
    "Kubernetes 기본 사용법",
    "Git 협업 워크플로우",
    "CI/CD 파이프라인 구축",
    "Flutter로 모바일 앱 개발",
    "Swift UI 기본 문법",
    "Kotlin과 Java 차이",
    "Spring Security 인증",
    "Kafka 메시지 큐 개념",
    "Redis 캐시 사용법",
    "TensorFlow와 PyTorch 비교",
    "머신러닝 모델 학습 방법",
    "NLP 자연어 처리 개념",
    "GPT 모델 동작 방식",
    "Transformer 모델 이해",
    "챗봇 AI 모델 학습",
    "웹소켓(WebSocket) 실시간 통신",
    "Next.js SSR과 CSR 비교",
    "Svelte 기본 개념",
    "Tailwind CSS 활용법",
    "Bootstrap 최신 버전 사용법",
    "웹 접근성 개선 방법",
    "SEO 최적화 기본 원칙",
    "Firebase 실시간 데이터베이스",
    "AWS Lambda 서버리스 함수",
    "Azure와 AWS 비교",
    "Google Cloud Platform 개요",
    "Nginx와 Apache 차이",
    "Linux 명령어 기본",
    "Shell Script 작성법",
    "프로그래밍 알고리즘 기초",
    "자료구조와 알고리즘",
    "정렬 알고리즘 비교",
    "DFS와 BFS 탐색 알고리즘",
    "블록체인 기술 개념",
    "스마트 컨트랙트 개발",
    "NFT 개발 방법",
    "메타버스 개념과 응용"
);


        // 입력값과 유사한 추천 검색어 필터링 (대소문자 무시)
        List<String> filteredSuggestions = predefinedSuggestions.stream()
                .filter(item -> item.toLowerCase().contains(query.toLowerCase()))
                .limit(5)
                .collect(Collectors.toList());

        return ResponseEntity.ok()
                .contentType(MediaType.APPLICATION_JSON)
                .body(filteredSuggestions);
    }
}