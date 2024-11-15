import React from "react";
import Login from "./Pages/Login.jsx";
import Register from "./Pages/Register.jsx";
import Home from "./Pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContextProvider } from "./context/AuthContext.jsx";
import VerifyUser from "./utils/VerifyUser.jsx";

const App = () => {
  return (
    <AuthContextProvider>
      <div className=" bg-[url('Background.jpg')] bg-cover bg-center p-2 w-screen h-screen flex items-center justify-center">
        <ToastContainer />
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<VerifyUser />}>
              <Route path="/" element={<Home />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthContextProvider>
  );
};

export default App;
