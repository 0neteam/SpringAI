const API_URL = "http://localhost:8080/api/auth"; // ✅ Spring Boot 백엔드 API

// ✅ 로그인 요청
export const login = async (username, password) => {
    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    console.log("로그인 응답 상태 코드:", response.status);

    if (!response.ok) {
        const errorMessage = await response.text(); // 서버에서 보내는 에러 메시지 읽기
        console.error("로그인 오류 메시지:", errorMessage);
        throw new Error(`로그인 실패: ${errorMessage}`);
    }

    const data = await response.json();
    console.log("받은 토큰:", data.token);

    // JWT 토큰을 Bearer 형식으로 저장
    localStorage.setItem("token", `Bearer ${data.token}`);
};

// ✅ 회원가입 요청
export const register = async (username, password) => {
    const response = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
    });

    console.log("회원가입 응답 상태 코드:", response.status);

    if (!response.ok) {
        const errorMessage = await response.text(); // 서버에서 보내는 에러 메시지 읽기
        console.error("회원가입 오류 메시지:", errorMessage);
        throw new Error(`회원가입 실패: ${errorMessage}`);
    }

    console.log("회원가입 성공!");
};

// ✅ 로그인 상태 확인
export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null && token.startsWith("Bearer ");
};

// ✅ 인증된 요청을 위한 공통 fetch 함수
export const authFetch = async (url, options = {}) => {
    const token = localStorage.getItem("token");

    if (!token) {
        console.error("인증 토큰이 없습니다.");
        throw new Error("인증이 필요합니다.");
    }

    const response = await fetch(url, {
        ...options,
        headers: {
            ...options.headers,
            "Authorization": token, // Bearer 토큰 포함
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        const errorMessage = await response.text();
        console.error("API 요청 오류:", errorMessage);
        throw new Error(`API 요청 실패: ${errorMessage}`);
    }

    return response.json();
};

// ✅ 로그아웃 기능
export const logout = () => {
    localStorage.removeItem("token");
    console.log("로그아웃 완료!");
    window.location.href = "/login"; // ✅ 로그아웃 후 로그인 페이지로 이동
};
