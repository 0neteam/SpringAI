import React, { useState, useEffect } from "react";
import { Button, Form, InputGroup, Container, Alert, Spinner, ListGroup } from "react-bootstrap";

const SearchComponent = () => {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchHistory, setSearchHistory] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [favorites, setFavorites] = useState([]);

  // 최근 검색어 & 즐겨찾기 불러오기
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }

    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // 검색 기록 저장
  useEffect(() => {
    localStorage.setItem("searchHistory", JSON.stringify(searchHistory));
  }, [searchHistory]);

  // 검색 기록 개별 삭제
  const removeSearchHistory = (query) => {
    const updatedHistory = searchHistory.filter((item) => item !== query);
    setSearchHistory(updatedHistory);
  };

  // 즐겨찾기 추가
  const addToFavorites = (query) => {
    if (!query || favorites.includes(query)) return;
    const updatedFavorites = [...favorites, query];
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // 즐겨찾기 삭제
  const removeFromFavorites = (query) => {
    const updatedFavorites = favorites.filter((item) => item !== query);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  // 자동완성 API 호출
  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await fetch(`http://localhost:8080/suggest?query=${query}`);
        if (!res.ok) throw new Error("서버 오류");
        const data = await res.json();
        setSuggestions(data);
      } catch (error) {
        console.error("자동완성 오류:", error);
      }
    };

    fetchSuggestions();
  }, [query]);

  // 검색 실행 함수
  const searchPrompt = async (selectedQuery) => {
    const searchQuery = selectedQuery || query;
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
      data = data.replace(/[`~!@#$%^&*()_|+\-=?;:'",.<>{}[\]\\\/]/g, "").trim();
      const formattedResult = data.split("\n").slice(0, 6).join("\n");
      setResult(formattedResult);

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

    setQuery("");
    setSuggestions([]);
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
        <Button variant="warning" onClick={() => addToFavorites(query)} disabled={!query.trim()}>
          ⭐ 즐겨찾기 추가
        </Button>

        {/* 자동완성 추천 리스트 */}
        {suggestions.length > 0 && (
          <ListGroup className="position-absolute w-100 shadow bg-white" style={{ top: "100%", zIndex: 10 }}>
            {suggestions.map((item, index) => (
              <ListGroup.Item 
                key={index} 
                action 
                onClick={() => searchPrompt(item)}
              >
                {item}
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </InputGroup>

      {/* 검색 결과 */}
      {error && <Alert variant="danger">{error}</Alert>}
      {result && (
        <div className="text-center mt-2 p-4 border rounded bg-light w-100"
          style={{
            maxHeight: "250px", 
            overflowY: "auto",
            textAlign: "left",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word"
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
              <li key={index} className="d-flex justify-content-between align-items-center">
                <span 
                  className="text-primary" 
                  style={{ cursor: "pointer" }} 
                  onClick={() => searchPrompt(item)}
                >
                  {item}
                </span>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeSearchHistory(item)} 
                  style={{ marginLeft: "10px" }} // 🔹 간격 조정
                >
                  🗑️
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 즐겨찾기 목록 */}
      {favorites.length > 0 && (
        <div className="mt-3 p-2 border rounded bg-white">
          <h6 className="text-muted">⭐ 즐겨찾기</h6>
          <ul className="list-unstyled mb-0">
            {favorites.map((item, index) => (
              <li key={index} className="d-flex justify-content-between align-items-center">
                <span className="text-primary" style={{ cursor: "pointer" }} onClick={() => searchPrompt(item)}>
                  {item}
                </span>
                <Button 
                  variant="danger" 
                  size="sm" 
                  onClick={() => removeFromFavorites(item)} 
                  style={{ marginLeft: "10px" }} // 🔹 간격 조정
                >
                  ❌
                </Button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
};

export default SearchComponent;