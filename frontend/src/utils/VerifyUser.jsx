import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { UseAuth } from "../context/AuthContext";

const VerifyUser = () => {
  const { authUser } = UseAuth();
  return authUser ? <Outlet /> : <Navigate to={"/login"} />;
};

export default VerifyUser;
