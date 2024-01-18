import React, { useState } from 'react';
// import axios from 'axios';
import './Chatbot.css';
import FileUploadButton from './FileUploadButton';


const Chatbot = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);

  const getResponse = async (userInput) => {
    const data = {
      question: userInput,
      max_tokens: 300
    };
try {
    const response = await fetch('http://localhost:8000/ask_chatbot/', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
      });
      const responseData= await response.json()
      console.log(responseData.result.trim())
      return responseData.result.trim();
    } catch (error) {
      console.error('Error communicating with the API:', error.message);
      return '';
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInput('');
    if (!input.trim()) return;
    const userMessage = { text: input, user: true };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    const aiMessage = { text: '...', user: false };
    setMessages((prevMessages) => [...prevMessages, aiMessage]);
    const response = await getResponse(input);
    const newAiMessage = { text: response, user: false };
    setMessages((prevMessages) => [...prevMessages.slice(0, -1), newAiMessage]);
  };

  return (
    <>
    <h1 className='chatbot-heading'>Chatbot Window</h1>
    <div className="chatbot-main">
    <div className="info-container">
      <li>
        Initially without uploading a file chatbot can have general conversation with you.
      </li>
      <li>
        To chat regarding CSV, upload the csv by clicking on the upload icon beside input space.
      </li>
      <li>
        Once CSV is uploaded it won't be able to have general talk with you.
      </li>
    </div>
    <div className="chatbot-container">
      
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.user ? 'user-message' : 'ai-message'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className='input-form'>
      <FileUploadButton/>
        <form className="chatbot-input-form" onSubmit={handleSubmit} > 
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button type="submit">Send</button>
        </form>
      </div>
    </div>
    </div>
    </>
  );
};
export default Chatbot;