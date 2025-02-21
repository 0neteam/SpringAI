import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import SearchComponent from "./SearchComponent";
import Login from "./Login"; // 로그인 컴포넌트
import Register from "./Register"; // 회원가입 컴포넌트

function App() {
  return (
    <Router>
      <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
        {/* 네비게이션 바 */}
        <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
          <Link to="/login">
            <Button variant="dark">로그인</Button>
          </Link>
          <Link to="/register">
            <Button variant="outline-dark">회원가입</Button>
          </Link>
        </div>

        <Routes>
          {/* 메인 페이지 */}
          <Route path="/" element={
            <>
              <h3 className="fw-bold mb-3">원하는 정보를 검색하세요</h3>
              <SearchComponent />
            </>
          } />
          {/* 로그인 페이지 */}
          <Route path="/login" element={<Login />} />
          {/* 회원가입 페이지 */}
          <Route path="/register" element={<Register />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
