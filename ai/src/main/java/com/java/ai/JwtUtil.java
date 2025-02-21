package com.java.ai;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.UnsupportedJwtException;
import io.jsonwebtoken.security.SignatureException;
import jakarta.annotation.PostConstruct;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}") // 환경 변수에서 Secret Key 가져오기
    private String secretKey;

    private final long EXPIRATION_TIME = 1000 * 60 * 60; // 1시간 (60분)

    @PostConstruct
    public void init() {
        System.out.println("✅ Loaded JWT Secret Key: " + secretKey);
    }


    // ✅ JWT 토큰 생성
    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    // ✅ 토큰에서 사용자 이름 추출
    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    // ✅ 토큰의 Claim 정보 추출 (발급 시간, 만료 시간, 사용자 정보 등)
    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (ExpiredJwtException e) {
            throw new RuntimeException("토큰이 만료되었습니다.");
        } catch (MalformedJwtException e) {
            throw new RuntimeException("토큰이 손상되었습니다.");
        } catch (SignatureException e) {
            throw new RuntimeException("토큰 서명이 유효하지 않습니다.");
        } catch (UnsupportedJwtException e) {
            throw new RuntimeException("지원되지 않는 토큰 형식입니다.");
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("토큰이 비어 있거나 잘못되었습니다.");
        }
    }

    // ✅ 토큰 검증 (유효한지 확인)
    public boolean validateToken(String token) {
        try {
            extractClaims(token); // 위에서 예외 발생 시 catch 블록으로 이동
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
