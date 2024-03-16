import SendImg from "../assets/svg/sendimg.svg";
import userDp from "../assets/svg/user-dp.svg";
import aiDp from "../assets/svg/aiDp.svg";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

const ChatSpace = ({ uploadedFile }) => {
  // State to manage user input question and chat history
  const [question, setQuestion] = useState("");
  const [chats, setChats] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll chat container to bottom whenever chats change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight - 500;
    }
  }, [chats]);

  // Function to handle Enter key press
  const handleKeyUp = (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  // Function to handle question submission
  const handleSubmit = async () => {
    //Check if submit without question
    if (question.length === 0) {
      toast.error("Type some question");
      return;
    }

    setChats((prevChats) => [
      ...prevChats,
      { sender: "user", message: question.trim() },
    ]);
    setQuestion("");

    // Send user question to server and get AI response
    const answerPromise = new Promise(async (resolve, reject) => {
      const res = await fetch("http://localhost:8000/process", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });
      if (!res.ok) reject();
      else {
        resolve();
        const data = await res.json();
        setChats((prevChats) => [
          ...prevChats,
          { sender: "ai", message: data.result },
        ]);
      }
    });

    // Display toast notification for answer generation process
    toast.promise(answerPromise, {
      loading: "Generating Answer",
      success: "Generated",
      error: "Error",
    });
  };

  return (
    <section className="max-w-[1450px] w-full mx-auto h-[calc(100vh-77px)] pt-20 pb-10 relative max-2xl:px-[32px] flex flex-col justify-between">
      {/* Render background when there are no chats */}
      {chats.length === 0 && (
        <div className="w-full h-[65vh] flex flex-col items-center justify-center text-[#E6E8EE] text-9xl font-bold">
          Start Chat
          <span className="text-[#E6E8EE] text-xl font-bold">
            Upload PDF and Ask questions
          </span>
        </div>
      )}

      {/* Render chat history */}
      {chats.length > 0 && (
        <div
          ref={chatContainerRef}
          className="w-full h-[72vh] overflow-y-scroll scrollbar-hidden flex flex-col max-xl:gap-10 gap-20"
        >
          {/* Chat structure */}
          {chats.map((chat, index) => (
            <div key={index} className="flex items-start gap-6">
              <img src={chat.sender === "user" ? userDp : aiDp} alt="Dp" />
              <div>{chat.message}</div>
            </div>
          ))}
        </div>
      )}

      {/* Input field for asking questions */}
      <div
        className={`w-full z-[100] px-10 bottom-10 flex items-center justify-between border-2 border-[#E4E8EE] shadow-drop-input rounded-md ${
          !uploadedFile ? "cursor-not-allowed bg-[rgba(231,231,231,1)]" : ""
        }`}
      >
        <input
          type="text"
          className={`w-[95%] max-xl:py-2 py-3 outline-none bg-transparent ${
            !uploadedFile ? "cursor-not-allowed" : ""
          }`}
          placeholder="Ask questions here ..."
          value={question}
          disabled={uploadedFile ? false : true}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyUp={(e) => handleKeyUp(e)}
        />

        {/* Send Icon */}
        <img
          src={SendImg}
          alt="send"
          className={`${
            !uploadedFile ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          onClick={handleSubmit}
        />
      </div>
    </section>
  );
};

export default ChatSpace;
