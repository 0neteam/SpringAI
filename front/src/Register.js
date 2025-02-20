import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "./authService";
import { Container, Form, Button } from "react-bootstrap";

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await register(username, password);
            alert("회원가입 성공!");
            navigate("/login"); // 로그인 페이지로 이동
        } catch (err) {
            setError("회원가입 실패");
        }
    };

    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h2>회원가입</h2>
            {error && <p className="text-danger">{error}</p>}
            <Form onSubmit={handleRegister} className="w-50">
                <Form.Group className="mb-3">
                    <Form.Control type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Control type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="dark" className="w-100">회원가입</Button>
            </Form>
        </Container>
    );
};

export default Register;
