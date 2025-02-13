import { useState, useEffect } from "react";

function SearchComponent() {
    const [message, setMessage] = useState("");
    const [response, setResponse] = useState("");
    const [history, setHistory] = useState([]);

    // API 호출하여 대화 내역 가져오기
    const fetchHistory = async () => {
        const res = await fetch("http://localhost:8080/history");
        const data = await res.json();
        setHistory(data);
    };

    // 메시지 전송 함수
    const handleSubmit = async () => {
        const res = await fetch("http://localhost:8080/search", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ msg: message }),
        });
        const data = await res.text();
        setResponse(data);
        setMessage(""); // 입력창 초기화
        fetchHistory(); // 대화 기록 갱신
    };

    // 컴포넌트가 마운트될 때 대화 기록 가져오기
    useEffect(() => {
        fetchHistory();
    }, []);

    return (
        <div>
            <input 
                type="text" 
                value={message} 
                onChange={(e) => setMessage(e.target.value)}
                placeholder="질문을 입력하세요..."
            />
            <button onClick={handleSubmit}>전송</button>
            <p>응답: {response}</p>

            <h3>대화 기록</h3>
            <ul>
                {history.map((chat, index) => (
                    <li key={index}>
                        <strong>사용자:</strong> {chat.userMessage} <br />
                        <strong>AI:</strong> {chat.botResponse}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SearchComponent;
