import React, { useState } from "react";
import { register } from "./authService";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            alert("회원가입 성공!");
            window.location.href = "/login";
        } catch (err) {
            setError("회원가입 실패");
        }
    };

    return (
        <div>
            <h2>회원가입</h2>
            {error && <p>{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
                <input type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">회원가입</button>
            </form>
        </div>
    );
};

export default Register;
