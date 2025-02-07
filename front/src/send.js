import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log("전송할 메시지:", message);  // 메시지 콘솔에 찍어서 확인
    fetch('http://localhost:8080/api/chat/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: message }),  // React에서 보낼 메시지
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // 응답이 왔는지 확인
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};