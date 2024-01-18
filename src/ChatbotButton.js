import React from 'react';
import './ChatbotButton.css'
import { NavLink } from 'react-router-dom';
import icon from './icon.png'



const ChatbotButton = () => {
    return (
      <NavLink to="/chatbot">
        <button className="circular-button" >
        <img src={icon} alt="Button Icon" className="button-icon" />
        </button>
      </NavLink>
        
  );
};

export default ChatbotButton;

