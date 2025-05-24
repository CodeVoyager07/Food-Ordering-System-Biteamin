// Chatbot.jsx
import React, { useState } from "react";
import "./Chatbot.css"; // Import the CSS file

// Chatbot intents with multiple randomized responses
const chatbotData = [
  {
    keywords: ["hi", "hello", "long time no see", "hey", "hey there", "hello there", "hello hi", "just going to say hi"],
    responses: ["Hey there!", "Hi! How can I help you?", "Hello! 👋", "Hi! How are you doing?", "Good day! What can I do for you today?", "Greetings! How can I assist?"]
  },
  {
    keywords: ["status", "track", "where is my order", "order status", "How long will it take?", "When will my order arrive?"],
    responses: [
      "You can track your order in the 'Order' section.",
      "We're preparing your order with care!",
      "Your order is on its way!",
      "Usually it takes 10-15 minutes depending on your orders."
    ]
  },
  {
    keywords: ["support", "help", "issue", "problem", "error", "I need help", "Contact customer service", "contact customer service"],
    responses: [
      "You can reach our support team at +91-7310402208 or email us at support@foodapp.com.",
    ]
  },
  {
    keywords: ["food", "menu", "I want to see what I can order", "Food", "Menu"],
    responses: [
      "Here's our current menu! You can choose from pizzas, burgers, pasta, drinks, and more. Would you like me to suggest something?"
    ]
  },
  {
    keywords: ["bye", "goodbye"],
    responses: ["Goodbye! 👋", "See you soon!", "Take care!"]
  },
  {
    keywords: ["feedback", "review", "rate"],
    responses: [
      "We'd love to hear your feedback!",
      "Your opinion means a lot. Share it with us!",
      "Help us improve — feedback is welcome!"
    ]
  },
  {
    keywords: ["cancel", "Cancel"],
    responses: [
      "I'm sorry to hear that! You can reach our team at +91-9876543210 or email us at support@foodapp.com to cancel your order."
    ]
  },
  {
    keywords: ["working hours", "open"],
    responses: [
      "We're open daily from 9 AM to 5 PM. Orders can be placed anytime during these hours."
    ]
  },
  {
    keywords: ["pay", "Pay", "payment", "Payment"],
    responses: [
      "We accept cash, UPI, and QR code scanner."
    ]
  },
  {
    keywords: ["place order", "Place order", "payment", "Payment"],
    responses: [
      "you can place the order by adding the food items into the cart, then proceed to checkout!"
    ]
  },
];

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    const botReply = getBotReply(input);

    setMessages([...messages, userMsg, { sender: "bot", text: botReply }]);
    setInput("");
  };

  const getBotReply = (message) => {
    const msg = message.toLowerCase();
    const match = chatbotData.find(({ keywords }) =>
      keywords.some((kw) => msg.includes(kw))
    );

    if (match) {
      const responses = match.responses;
      const randomIndex = Math.floor(Math.random() * responses.length);
      return responses[randomIndex];
    }

    return "Sorry, I didn't understand that.";
  };

  return (
    <div className="chatbot-container">
      <h3 className="chatbot-title">🧠 Ask Your Query</h3>
      <div className="chatbot-chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${msg.sender === "user" ? "chatbot-user" : "chatbot-bot"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-area">
        <input
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="chatbot-input"
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button onClick={handleSend} className="chatbot-button">Send</button>
      </div>
    </div>
  );
};

export default Chatbot;
