import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./SearchComponent"; // components 폴더가 있으면 ./components/SearchComponent

function App() {
    return (
        <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
            <h2 className="mb-3">ChatGPT 챗봇</h2>
            <h3 className="fw-bold mb-3">질문을 입력하세요!</h3>
            <SearchComponent />
            
            {/* 로그인 / 회원가입 버튼 개선 */}
            <div className="d-flex justify-content-end w-100 mt-3 gap-2">
                <Button variant="dark">로그인</Button>
                <Button variant="outline-dark">회원가입</Button>
            </div>
        </Container>
    );
}

export default App;
