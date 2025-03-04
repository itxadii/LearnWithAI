import React, { useState } from "react";
import axios from "axios";

function App() {
const [messages, setMessages] = useState([]);
const [input, setInput] = useState("");

const sendMessage = async () => {
    if (!input) return;

    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);

    const response = await axios.post("http://127.0.0.1:5000/chat", {
    message: input,
    });

    const botMessage = {
    role: "bot",
    content: response.data.choices[0].message.content,
    };
    setMessages([...messages, userMessage, botMessage]);

    setInput("");
};

return (
    <div style={{ width: "50%", margin: "auto", textAlign: "center" }}>
    <h2>Chat with AI</h2>
    <div
        style={{
        border: "1px solid gray",
        padding: "10px",
        height: "300px",
        overflowY: "auto",
        }}
    >
        {messages.map((msg, index) => (
        <p
            key={index}
            style={{ textAlign: msg.role === "user" ? "right" : "left" }}
        >
            <b>{msg.role === "user" ? "You" : "AI"}:</b> {msg.content}
        </p>
        ))}
    </div>
    <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        style={{ width: "80%" }}
    />
    <button onClick={sendMessage}>Send</button>
    </div>
);
}

export default App;
