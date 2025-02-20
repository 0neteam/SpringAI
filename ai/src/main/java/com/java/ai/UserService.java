package com.java.ai;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder; // 🔥 비밀번호 암호화 지원

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    // ✅ 회원가입 (중복 검사 추가)
    public void registerUser(String username, String password) {
        // 1️⃣ 중복 사용자 체크
        if (userRepository.findByUsername(username).isPresent()) {
            throw new IllegalArgumentException("이미 존재하는 사용자입니다.");
        }

        // 2️⃣ 비밀번호 암호화 후 저장
        String encodedPassword = passwordEncoder.encode(password);
        User user = new User();
        user.setUsername(username);
        user.setPassword(encodedPassword);
        userRepository.save(user);
    }

    // ✅ 사용자 조회 (로그인 검증용)
    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
