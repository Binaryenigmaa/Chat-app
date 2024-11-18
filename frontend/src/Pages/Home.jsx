import React from "react";
import { UseAuth } from "../context/AuthContext";
import ChatWindow from "../components/ChatWindow.jsx";
import SideBar from "../components/SideBar.jsx";

const Home = () => {
  const { authUser } = UseAuth();
  return (
    <div className="flex justify-between h-[95%] min-w-full md:min-w-[550px] md:max-w-[65%] px-2 md:h-full rounded-xl shadow-lg bg-gray-400 backdrop-filter backdrop-blur-lg bg-opacity-40">
      <div>
        <SideBar />
      </div>
      <div>
        <ChatWindow />
      </div>
    </div>
  );
};

export default Home;
