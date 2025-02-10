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
      setQuery(""); // �Է� �ʵ� �ʱ�ȭ
    } catch (error) {
      console.error("Error searching prompt:", error);
    }
  };

  return (
    <Container className="w-50">
      {/* �˻� �Է� �ʵ� */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="�˻�� �Է��ϼ���"
          aria-label="Prompt �˻�"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <Button variant="dark" onClick={searchPrompt}>
          �˻�
        </Button>
      </InputGroup>

      {/* �˻� ��� ��� */}
      {result && (
        <div className="w-50 text-center mt-2 p-3 border rounded bg-light">
          <strong>�˻� ���:</strong> {result}
        </div>
      )}
    </Container>
  );
};

export default SearchComponent;
