package com.java.ai;

import java.util.List;

import com.java.ai.entity.ChatHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ChatHistoryRepository extends JpaRepository<ChatHistory, Long> {
    List<ChatHistory> findTop10ByOrderByTimestampDesc(); // 최근 10개 대화 조회
}