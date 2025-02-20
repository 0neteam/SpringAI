import React, { useState } from "react";
import { login } from "./authService";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            alert("로그인 성공!");
            window.location.href = "/"; // 메인 페이지로 이동
        } catch (err) {
            setError("로그인 실패");
        }
    };

    return (
        <div>
            <h2>로그인</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleLogin}>
                <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">로그인</button>
            </form>
        </div>
    );
};

export default Login;
