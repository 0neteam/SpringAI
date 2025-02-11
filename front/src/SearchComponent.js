import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";

function SearchComponent() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const handleSearch = async () => {
    if (!input.trim()) return;

    try {
      const res = await fetch("http://localhost:8080/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ msg: input }),
      });

      const data = await res.text();
      setResponse(data);
    } catch (error) {
      console.error("Error fetching response:", error);
    }
  };

  return (
    <div className="w-50">
      <InputGroup>
        <Form.Control
          type="text"
          placeholder="ChatGPT���� �޽����� �Է��ϼ���"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <Button variant="dark" onClick={handleSearch}>
          ����
        </Button>
      </InputGroup>
      {response && (
        <div className="mt-3 p-2 border rounded bg-light">
          <strong>����:</strong> {response}
        </div>
      )}
    </div>
  );
}

export default SearchComponent;
