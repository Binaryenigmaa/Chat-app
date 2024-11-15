import React from "react";
import { UseAuth } from "../context/AuthContext";

const Home = () => {
  const { authUser } = UseAuth();
  return <div> HI {authUser.username}</div>;
};

export default Home;
