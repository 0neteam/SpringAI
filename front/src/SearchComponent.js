import React, { useState } from "react";
import { Button, Form, InputGroup, Container } from "react-bootstrap";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState("");

  const searchPrompt = async () => {
    if (!query.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: query }),
      });

      const data = await res.text();
      setResult(data);
      setQuery(""); // 입력 필드 초기화
    } catch (error) {
      console.error("Error searching prompt:", error);
    }
  };

  return (
    <Container className="w-50">
      {/* 검색 입력 필드 */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="검색어를 입력하세요"
          aria-label="Prompt 검색"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="dark" onClick={searchPrompt}>
          검색
        </Button>
      </InputGroup>

      {/* 검색 결과 출력 */}
      {result && (
        <div className="w-50 text-center mt-2 p-3 border rounded bg-light">
          <strong>검색 결과:</strong> {result}
        </div>
      )}
    </Container>
  );
};

export default SearchComponent;
