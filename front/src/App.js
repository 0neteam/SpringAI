import React from 'react';
import { Button, Form, InputGroup, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Container className="d-flex flex-column justify-content-center align-items-center vh-100">
      {/* 로고 */}
      <h2 className="mb-3">ChatGPT</h2>

      {/* 메인 질문 박스 */}
      <h3 className="fw-bold mb-3">무엇을 도와드릴까요?</h3>

      {/* 입력 필드 */}
      <InputGroup className="mb-3 w-50">
        <Form.Control
          placeholder="ChatGPT에게 메시지를 쓰세요"
          aria-label="ChatGPT 메시지 입력"
        />
        <Button variant="dark">전송</Button>
      </InputGroup>

      {/* 기능 버튼들 */}
  {/* <Row className="mb-3 flex-nowrap">
    <Col xs="auto"><Button variant="outline-secondary" className="w-100 text-nowrap">이미지 분석</Button></Col>
    <Col xs="auto"><Button variant="outline-secondary" className="w-100 text-nowrap">코딩</Button></Col>
    <Col xs="auto"><Button variant="outline-secondary" className="w-100 text-nowrap">텍스트 요약</Button></Col>
    <Col xs="auto"><Button variant="outline-secondary" className="w-100 text-nowrap">재미있는 정보</Button></Col>
    <Col xs="auto"><Button variant="outline-secondary" className="w-100 text-nowrap">데이터 분석</Button></Col>
  </Row> */}



      {/* 로그인 & 회원가입 버튼 */}
      <div className="position-absolute top-0 end-0 m-3 d-flex gap-2"> 
     <Button variant="dark">로그인</Button>
    <Button variant="outline-dark">회원 가입</Button>
</div>

    </Container>
  );
}

export default App;
