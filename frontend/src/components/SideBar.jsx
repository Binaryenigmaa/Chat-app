import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaSearch } from "react-icons/fa";
import { toast } from "react-toastify";
import { UseAuth } from "../context/AuthContext.jsx";
import { useNavigate } from "react-router-dom";
import { IoArrowBackSharp } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";

const SideBar = () => {
  const navigate = useNavigate();
  const { authUser, setAuthUser } = UseAuth();
  const [searchInput, setSearchInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchUser, setSearchUser] = useState([]);
  const [chatUser, setChatUser] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const chatUserHandler = async () => {
      setLoading(true);
      try {
        const chatters = await axios.get(`/api/user/currentchatters`);
        const data = chatters.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        setLoading(false);
        setChatUser(data);
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    chatUserHandler();
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const search = await axios.get(`/api/user/search?search=${searchInput}`);
      const data = search.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      setLoading(false);
      if (data.length === 0) {
        toast.info("User not found");
      } else {
        setSearchUser(data);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleUserClick = (user) => {
    setSelectedUserId(user._id);
  };

  const handleSearchBack = () => {
    setSearchUser([]);
    setSearchInput("");
  };

  const handleLogout = async () => {
    const confirmlogout = window.prompt(
      "Enter your username to confirm logout"
    );
    if (confirmlogout === authUser.username) {
      setLoading(true);
      try {
        const logout = await axios.post(`/api/auth/logout`);
        const data = logout.data;
        if (data.success === false) {
          setLoading(false);
          console.log(data.message);
        }
        toast.info(data.message);
        localStorage.removeItem("chatapp");
        setAuthUser(null);
        setLoading(false);
        navigate("/login");
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    } else {
      toast.info(`Aborted Logout`);
    }
  };

  console.log(searchUser);

  return (
    <div className="h-full w-auto px-1">
      <div className="flex justify-between gap-2">
        <form
          onSubmit={handleSearchSubmit}
          className="w-auto flex items-center justify-between bg-white rounded-full mt-2 "
        >
          <input
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            type="text"
            className="h-full m-2 rounded-full bg-transparent outline-none "
            placeholder="Search User"
          />
          <button className="btn btn-circle bg-sky-700 font-bold p-4">
            <FaSearch />
          </button>
        </form>
        <img
          src={authUser?.profilepic}
          onClick={() => navigate(`/profile/${authUser?._id}`)}
          className="self-center h-12 w-12 hover:scale-110 cursor-pointer "
        />
      </div>
      <div className="divider px-3 "></div>
      {searchUser?.length > 0 ? (
        <div>
          <div className="min-h-[70%] max-h-[80%] overflow-y-auto scrollbar ">
            <div className="w-auto">
              {searchUser.map((user, index) => (
                <div key={user._id}>
                  <div
                    onClick={() => handleUserClick(user)}
                    className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                      selectedUserId === user?._id ? `bg-sky-500` : ``
                    }`}
                  >
                    <div className="avatar">
                      <div className="w-12 rounded-full h-12">
                        <img src={user.profilepic} alt="user.img" />
                      </div>
                    </div>
                    <div className="flex flex-col flex-1">
                      <p className="font-bold text-gray-950">{user.username}</p>
                    </div>
                  </div>
                  <div className="divider divide-solid px-3 h-[1px]"></div>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-auto px-1 py-1 flex">
            <button
              className="bg-white rounded-full px-2 py-1 self-center "
              onClick={handleSearchBack}
            >
              <IoArrowBackSharp size={25} />
            </button>
          </div>
        </div>
      ) : (
        <div className="min-h-[70%] max-h-[80%] m overflow-y-auto scrollbar ">
          <div className="w-auto">
            {chatUser?.length === 0 ? (
              <div className="font-bold items-center flex flex-col text-xl text-yellow-500">
                <h1>Your Chat history is Empty</h1>
              </div>
            ) : (
              <div>
                {chatUser.map((user, index) => (
                  <div key={user._id}>
                    <div
                      onClick={() => handleUserClick(user)}
                      className={`flex gap-3 items-center rounded p-2 py-1 cursor-pointer ${
                        selectedUserId === user?._id ? `bg-sky-500` : ``
                      }`}
                    >
                      <div className="avatar">
                        <div className="w-12 rounded-full h-12">
                          <img src={user.profilepic} alt="user.img" />
                        </div>
                      </div>
                      <div className="flex flex-col flex-1">
                        <p className="font-bold text-gray-950">
                          {user.username}
                        </p>
                      </div>
                    </div>
                    <div className="divider divide-solid px-3 h-[1px]"></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="mt-auto px-1 py-1 flex ">
            <button
              onClick={handleLogout}
              className="hover:bg-red-500 w-auto p-2 cursor-pointer hover:text-white rounded-lg"
            >
              <BiLogOut size={25} />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
