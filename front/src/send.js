import React, { useState } from 'react';
import { Button, Form, InputGroup, Container } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    console.log("������ �޽���:", message);  // �޽��� �ֿܼ� �� Ȯ��
    fetch('http://localhost:8080/api/chat/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ msg: message }),  // React���� ���� �޽���
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);  // ������ �Դ��� Ȯ��
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }
};