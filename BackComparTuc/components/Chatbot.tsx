"use client";
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

interface QA {
  question: string;
  answer: string;
}

const qaPairs: QA[] = [
  { question: "¿Cómo te llamas?", answer: "Me llamo Chatbot." },
  { question: "¿Qué puedes hacer?", answer: "Puedo responder a tus preguntas predefinidas y convertir texto a voz." },
  { question: "¿Cuál es la capital de Francia?", answer: "La capital de Francia es París." },
  // Agrega más preguntas y respuestas aquí
];

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      // Web Speech API is supported
    } else {
      console.warn('Web Speech API is not supported in this browser.');
    }
  }, []);

  const toggleChat = () => {
    const chatPopup = document.getElementById('chat-popup') as HTMLElement;
    chatPopup.style.display = chatPopup.style.display === 'none' ? 'block' : 'none';
  };

  const sendMessage = () => {
    if (!userInput) return;

    const newMessages = [...messages, 'Tú: ' + userInput];
    setMessages(newMessages);

    const botResponse = getBotResponse(userInput);
    setMessages([...newMessages, 'Bot: ' + botResponse]);

    // Convierte el texto a voz
    const speech = new SpeechSynthesisUtterance(botResponse);
    window.speechSynthesis.speak(speech);

    // Limpiar el input
    setUserInput('');
  };

  const getBotResponse = (question: string): string => {
    const qaPair = qaPairs.find(qa => qa.question.toLowerCase() === question.toLowerCase());
    return qaPair ? qaPair.answer : "Lo siento, no entiendo la pregunta.";
  };

  const startVoiceRecognition = () => {
    const recognition = new (window.SpeechRecognition || (window as any).webkitSpeechRecognition)();
    recognition.lang = 'es-ES';
    recognition.start();

    recognition.onresult = (event) => {
      const spokenText = event.results[0][0].transcript;
      setUserInput(spokenText);
      sendMessage();
    };

    recognition.onerror = (event) => {
      console.error('Error occurred in recognition: ' + event.error);
    };
  };

  const ChatPopup = styled.div`
    display: none;
    position: fixed;
    bottom: 0;
    right: 15px;
    border: 1px solid #ccc;
    background-color: white;
    width: 300px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    z-index: 1000;
  `;

  const Header = styled.header`
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    text-align: center;
  `;

  const Messages = styled.div`
    height: 200px;
    overflow-y: auto;
    padding: 10px;
  `;

  const Input = styled.div`
    padding: 10px;
    border-top: 1px solid #ccc;
  `;

  return (
    <div>
      <button onClick={toggleChat}>Abrir Chat</button>

      <ChatPopup id="chat-popup">
        <Header>Chatbot</Header>
        <Messages>
          {messages.map((message, index) => (
            <div key={index}>{message}</div>
          ))}
        </Messages>
        <Input>
          <input
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Escribe tu mensaje..."
          />
          <button onClick={sendMessage}>Enviar</button>
          <button onClick={startVoiceRecognition}>Hablar</button>
        </Input>
      </ChatPopup>
    </div>
  );
};

export default Chatbot;