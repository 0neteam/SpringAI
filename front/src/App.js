import React from "react";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./SearchComponent"; // SearchComponent 가져오기

function App() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* 로고 */}
      <h2 className="mb-3">Prompt Search</h2>

      {/* 메인 질문 박스 */}
      <h3 className="fw-bold mb-3">원하는 정보를 검색하세요</h3>

      {/* 검색 컴포넌트 */}
      <SearchComponent />

      {/* 로그인 & 회원가입 버튼 */}
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
        <Button variant="dark">로그인</Button>
        <Button variant="outline-dark">회원가입</Button>
      </div>
    </Container>
  );
}

export default App;
