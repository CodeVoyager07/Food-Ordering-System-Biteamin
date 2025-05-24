import React from "react";
import { useNavigate } from "react-router-dom";
import "./Scrollbutton.css";

const ChatbotNavigateButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="fixed-chatbot-btn"
      onClick={() => navigate("/chatbot")}
      title="Open Chatbot"
    >
      💬
    </button>
  );
};

export default ChatbotNavigateButton;
