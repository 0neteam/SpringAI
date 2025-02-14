import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Container, Alert, Spinner } from "react-bootstrap";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);

  // 최근 검색어 불러오기
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  // localStorage 업데이트 (최신 검색 기록 저장)
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  const searchPrompt = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null); // 이전 검색 결과 초기화

    try {
      const res = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ msg: query }),
      });

      if (!res.ok) throw new Error("서버 응답 오류 발생!");

      const data = await res.text();
      setResult(data);

      // 검색 기록 저장 (중복 제거)
      setSearchHistory((prevHistory) => {
        const updatedHistory = [query, ...prevHistory.filter((item) => item !== query)].slice(0, 5);
        return updatedHistory;
      });
    } catch (error) {
      console.error("검색 오류:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }

    setQuery(""); // 입력 필드 초기화
  };

  return (
    <Container className="w-50">
      {/* 검색 입력 필드 */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="검색어를 입력하세요"
          aria-label="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading} // 검색 중 입력 비활성화
        />
        <Button variant="dark" onClick={searchPrompt} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "검색"}
        </Button>
      </InputGroup>

      {/* 검색 결과 */}
      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <div className="text-center mt-2 p-3 border rounded bg-light w-100">
          <strong>검색 결과:</strong> {result}
        </div>
      )}

      {/* 최근 검색어 표시 */}
      {searchHistory.length > 0 && (
        <div className="mt-3 p-2 border rounded bg-white">
          <h6 className="text-muted">최근 검색어</h6>
          <ul className="list-unstyled mb-0">
            {searchHistory.map((item, index) => (
              <li key={index} className="text-primary" style={{ cursor: "pointer" }} onClick={() => setQuery(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default SearchComponent;
