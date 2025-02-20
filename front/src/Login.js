import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "./authService";
import { Container, Form, Button } from "react-bootstrap";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await login(username, password);
            alert("로그인 성공!");
            navigate("/"); // ✅ 메인 페이지로 이동
        } catch (err) {
            setError("아이디 또는 비밀번호가 올바르지 않습니다.");
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h2>로그인</h2>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleLogin} className="w-50">
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100">로그인</Button>
            </Form>
        </Container>
    );
};

export default Login;
