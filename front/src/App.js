import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./SearchComponent"; // 검색 입력창 컴포넌트

function App() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
     
      <h2 className="mb-3">ChatGPT</h2>

      
      <h3 className="fw-bold mb-3">무엇을 도와드릴까요?</h3>

    
      <SearchComponent />

      
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
        <Button variant="dark">로그인</Button>
        <Button variant="outline-dark">회원가입</Button>
      </div>
    </Container>
  );
}

export default App;
