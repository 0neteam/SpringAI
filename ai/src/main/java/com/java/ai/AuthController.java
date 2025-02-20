package com.java.ai;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000") // React CORS 문제 방지
public class AuthController {

    private final UserService userService;
    private final JwtUtil jwtUtil;
    private final AuthenticationManager authenticationManager;
    private final BCryptPasswordEncoder passwordEncoder;

    public AuthController(UserService userService, JwtUtil jwtUtil, AuthenticationManager authenticationManager, BCryptPasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.jwtUtil = jwtUtil;
        this.authenticationManager = authenticationManager;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ 회원가입 엔드포인트 (비밀번호 암호화 적용)
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        String encodedPassword = passwordEncoder.encode(user.getPassword());
        userService.registerUser(user.getUsername(), encodedPassword);
        return ResponseEntity.ok("회원가입 성공");
    }

    // ✅ 로그인 엔드포인트 (예외 처리 추가)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(user.getUsername(), user.getPassword()));
            String token = jwtUtil.generateToken(user.getUsername());
            return ResponseEntity.ok(new AuthResponse(token));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("잘못된 아이디 또는 비밀번호입니다.");
        }
    }

    // ✅ 응답 객체
    static class AuthResponse {
        public String token;
        public AuthResponse(String token) {
            this.token = token;
        }
    }
}
