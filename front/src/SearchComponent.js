import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Container, Alert, Spinner, ListGroup } from "react-bootstrap";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]); // 자동완성 추천 검색어

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

  // 🔹 자동완성 API 호출 (입력값이 변경될 때 실행)
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]); // 검색어가 없으면 자동완성 리스트 초기화
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`http://localhost:8080/suggest?query=${query}`);
        if (!res.ok) throw new Error("서버 오류");
        const data = await res.json();
        setSuggestions(data); // 추천 검색어 리스트 저장
      } catch (error) {
        console.error("자동완성 오류:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // 검색 실행 함수 (코드 블록 및 특수문자 제거 후 한글/영어 유지)
  const searchPrompt = async (selectedQuery) => {
    const searchQuery = selectedQuery || query; // 선택한 추천 검색어나 사용자가 입력한 검색어
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ msg: searchQuery }),
      });

      if (!res.ok) throw new Error("서버 응답 오류 발생!");

      let data = await res.text();

      // 🔹 코드 블록, 특수문자 제거 & 영어와 한글만 유지
      data = data.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\\/]/g, "").trim();

      // 검색 결과 최대 6줄까지만 표시
      const formattedResult = data.split("\n").slice(0, 6).join("\n");
      setResult(formattedResult);

      // 검색 기록 저장 (중복 제거)
      setSearchHistory((prevHistory) => {
        const updatedHistory = [searchQuery, ...prevHistory.filter((item) => item !== searchQuery)].slice(0, 5);
        return updatedHistory;
      });

    } catch (error) {
      console.error("검색 오류:", error);
      setError("검색 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setLoading(false);
    }

    setQuery(""); // 입력 필드 초기화
    setSuggestions([]); // 추천어 초기화
  };

  return (
    <Container className="w-50">
      {/* 검색 입력 필드 */}
      <InputGroup className="mb-3 position-relative">
        <Form.Control
          placeholder="검색어를 입력하세요"
          aria-label="검색어 입력"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          disabled={loading}
        />
        <Button variant="dark" onClick={() => searchPrompt()} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "검색"}
        </Button>

        {/* 자동완성 추천 리스트 */}
        {suggestions.length > 0 && (
          <ListGroup className="position-absolute w-100 shadow bg-white" style={{ top: "100%", zIndex: 10 }}>
            {suggestions.map((item, index) => (
              <ListGroup.Item 
                key={index} 
                action 
                onClick={() => searchPrompt(item)} // 선택 시 검색 실행
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </InputGroup>

      {/* 검색 결과 (크기 증가 & 스크롤 추가) */}
      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <div className="text-center mt-2 p-4 border rounded bg-light w-100"
          style={{
            maxHeight: "250px",  // 🔹 기존 150px → 250px (박스 크기 증가)
            overflowY: "auto",   // 🔹 스크롤 가능하게 설정
            textAlign: "left",
            whiteSpace: "pre-wrap", // 🔹 줄바꿈 유지
            wordBreak: "break-word" // 🔹 긴 단어 자동 줄바꿈
          }}>
          <strong>검색 결과:</strong>
          <div>{result}</div>
        </div>
      )}

      {/* 최근 검색어 표시 */}
      {searchHistory.length > 0 && (
        <div className="mt-3 p-2 border rounded bg-white">
          <h6 className="text-muted">최근 검색어</h6>
          <ul className="list-unstyled mb-0">
            {searchHistory.map((item, index) => (
              <li 
                key={index} 
                className="text-primary" 
                style={{ cursor: "pointer" }} 
                onClick={() => searchPrompt(item)} // 선택 시 검색 실행
              >
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
