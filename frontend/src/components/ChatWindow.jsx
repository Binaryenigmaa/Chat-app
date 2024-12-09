import React, { useEffect, useRef, useState } from "react";
import userConversation from "../store/useConversation.js";
import { UseAuth } from "../context/AuthContext";
import { TiMessages } from "react-icons/ti";
import { IoArrowBackSharp } from "react-icons/io5";
import axios from "axios";

const ChatWindow = ({ onBackUser }) => {
  const {
    messages,
    selectedConversation,
    setMessage,
    setSelectedConversation,
  } = userConversation();
  const { authUser } = UseAuth();
  const [loading, setLoading] = useState(false);
  const lastMessageRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      lastMessageRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, [messages]);

  useEffect(() => {
    const getMessages = async () => {
      setLoading(true);
      try {
        const messages = await axios.get(
          `/api/message/${selectedConversation?._id}`
        );
        const data = await messages.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setMessage(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    if (selectedConversation?._id) {
      getMessages();
    }
  }, [selectedConversation?._id, setMessage]);
  console.log(messages);
  return (
    <div className="md:min-w-[500px] h-screen flex flex-col py-2  ">
      {selectedConversation === null ? (
        <div className="flex items-center justify-center w-full h-full">
          <div className="px-4 text-center text-2xl text-gray-950 font-semibold flex flex-col items-center gap-2">
            <p>Welcome {authUser.username} 😊!!</p>
            <p>Let's start a conversation!</p>
            <TiMessages className="text-6xl text-center" />
          </div>
        </div>
      ) : (
        <>
          <div className="flex justify-between gap-1 bg-sky-600 md:px-2 rounded-lg h-10 md:h-12 ">
            <div className="flex gap-2 md:justify-between items-center w-full ">
              <div className="md:hidden ml-1 self-center ">
                <button
                  onClick={() => onBackUser(true)}
                  className="bg-white rounded-full px-2 py-1 self-center "
                >
                  <IoArrowBackSharp size={25} />
                </button>
              </div>
              <div className="flex justify-between mr-2 gap-2 ">
                <div className="self-center">
                  <img
                    src={selectedConversation?.profilepic}
                    className="rounded-full w-6 h-6 md:w-10 md:h-10 cursor-pointer "
                  />
                </div>
                <span className="text-gray-950 self-center text-sm md:text-xl font-bold ">
                  {selectedConversation?.username}
                </span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-auto">
            {loading && (
              <div className="flex w-full h-full flex-col items-center justify-center gap-4 bg-transparent  ">
                <div className="loading loading-spinner "></div>
              </div>
            )}
            {!loading && messages?.length === 0 && (
              <p className="text-center text-white items-center">
                Send a message to start a conversation
              </p>
            )}
            {!loading &&
              messages?.length > 0 &&
              messages?.map((message) => (
                <div
                  className="text-white"
                  key={message?._id}
                  ref={lastMessageRef}
                >
                  <div
                    className={`chat ${
                      message.senderId === authUser._id
                        ? "chat-start"
                        : "chat-end"
                    }`}
                  >
                    <div className="chat-image avatar"></div>
                    <div
                      className={`chat-bubble ${
                        message.senderId === authUser._id ? "bg-sky-600" : ""
                      }`}
                    >
                      {message?.message}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ChatWindow;
