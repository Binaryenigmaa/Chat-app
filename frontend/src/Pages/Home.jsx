import React, { useState } from "react";
import ChatWindow from "../components/ChatWindow.jsx";
import SideBar from "../components/SideBar.jsx";

const Home = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setIsSidebarVisible(false);
  };
  const handleShowSidebar = (user) => {
    setSelectedUser(null);
    setIsSidebarVisible(true);
  };
  return (
    <div className="flex justify-between min-w-full md:min-w-[550px] md:max-w-[65%] px-2 h-[95%] md:h-full rounded-xl shadow-lg bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-50">
      <div
        className={`w-full py-2 md:flex ${isSidebarVisible ? "" : "hidden"}`}
      >
        <SideBar onSelectUser={handleUserSelect} />
      </div>
      <div
        className={`divider divider-horizontal px-3 md:flex ${
          isSidebarVisible ? "" : "hidden"
        } `}
      />
      <div className={`flex-auto ${selectedUser ? "" : "hidden md:flex"}`}>
        <ChatWindow onBackUser={handleShowSidebar} />
      </div>
    </div>
  );
};

export default Home;
