import axios from "axios";
import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../components/css/chat.css";
import SendIcon from "@mui/icons-material/Send";
import Pusher from "pusher-js";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { Typography } from "@mui/material";
import { Stack } from "@mui/system";

const Chat = () => {
  const location = useLocation();
  const { arisedBy, sentToName, sentTo } = location.state;
  var id = localStorage.getItem("logID");

  let chatId;
  console.log(arisedBy, sentTo);

  if (arisedBy > sentTo) {
    chatId = arisedBy + sentTo;
  } else {
    chatId = sentTo + arisedBy;
  }

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:8400/new", {
      chatId: chatId,
      message: input,
      arisedBy: arisedBy,
      timestamp: new Date().toUTCString(),
    });
    setInput("");
  };

  useEffect(() => {
    axios.get(`http://localhost:8400/all/${chatId}`).then((response) => {
      setMessages(response.data);
    });
  }, []);

  useEffect(() => {
    // pusher
    const pusher = new Pusher("804e94585cde1b22f4d5", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe("messages");
    channel.bind("inserted", function (newMessage) {
      setMessages([...messages, newMessage]);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  return (
    <>
      <div className="chat">
        <div className="chat_body">
          {messages.map((message) => (
            <p
              className={`chat_message ${
                id === message.arisedBy && "chat_sender"
              }`}
            >
              {message.message}
              <span className="chat_timestamp">{message.timestamp}</span>
            </p>
          ))}
        </div>
        <div className="chat_header">
          <Stack direction="row">
            <ArrowBackIosNewIcon
              style={{
                height: "30px",
                width: "30px",
                margin: "15px",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => {
                window.location.href = "/userprofile";
              }}
            />
            <Typography
              style={{ color: "white", marginTop: "15px", fontSize: "20px" }}
            >
              {sentToName}
            </Typography>
          </Stack>
        </div>
        <footer className="chat_footer mt-auto">
          <form>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message"
              type="text"
            />
            <button onClick={sendMessage} type="submit">
              <SendIcon />
            </button>
          </form>
        </footer>
      </div>
    </>
  );
};

export default Chat;
