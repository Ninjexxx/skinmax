import { useState } from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import "../styles/chatPage.css";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const [sessionId, setSessionId] = useState(
    localStorage.getItem("chatSession") || ""
  );

  const sendMessage = async () => {
    if (!message.trim()) return;

    const token = localStorage.getItem("token");
    const currentMessage = message;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: currentMessage,
      },
    ]);

    setMessage("");

    try {
      const response = await fetch(
        "http://localhost:8080/chat",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            session_id: sessionId,
            message: currentMessage,
          }),
        }
      );

      const data = await response.json();

      setSessionId(data.session_id);

      localStorage.setItem(
        "chatSession",
        data.session_id
      );

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch (err) {
      console.error(err);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Desculpe, não consegui acessar o assistente de IA.",
        },
      ]);
    }
  };

  const usePrompt = (prompt) => {
    setMessage(prompt);
  };

  return (
    <div className="layout">
      <Sidebar />

      <main className="chat-page">

        <div className="chat-header">
          <div>
            <h2>Assistente de IA SkinMax</h2>
            <p>Online e pronto para ajudar</p>
          </div>

          <img
            src="https://i.pravatar.cc/40"
            alt="Perfil"
            className="chat-avatar"
          />
        </div>

        <div className="chat-empty">

          <div className="bot-icon">
            IA
          </div>

          <h1>
            Comece a conversar com Glow
          </h1>

          <p>
            Pergunte sobre sua rotina de skincare,
            seu último escaneamento ou cuidados pelo clima.
          </p>

        </div>

        {messages.length > 0 && (
          <div className="chat-messages">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`message ${msg.role}`}
              >
                {msg.content}
              </div>
            ))}

          </div>
        )}

        <div className="quick-prompts">

          <button
            onClick={() =>
              usePrompt(
                "Revise minha rotina de skincare"
              )
            }
          >
            Revisar minha rotina
          </button>

          <button
            onClick={() =>
              usePrompt(
                "Explique meu último escaneamento"
              )
            }
          >
            Explicar meu último escaneamento
          </button>

          <button
            onClick={() =>
              usePrompt(
                "Me dê dicas de skincare com base no clima"
              )
            }
          >
            Dicas pelo clima
          </button>

          <button
            onClick={() =>
              usePrompt(
                "Quero falar com um dermatologista"
              )
            }
          >
            Falar com dermatologista
          </button>

        </div>

        <div className="chat-input">

          <input
            type="text"
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                sendMessage();
              }
            }}
            placeholder="Pergunte qualquer coisa sobre sua pele..."
          />

          <button
            onClick={sendMessage}
          >
            Enviar
          </button>

        </div>

        <p className="chat-disclaimer">
          A IA da SkinMax pode cometer erros.
          Considere consultar um profissional
          em condições graves.
        </p>

      </main>
    </div>
  );
}
