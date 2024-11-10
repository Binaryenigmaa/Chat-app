import React, { useState } from "react";
import FormField from "../components/FormField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({});

  const handleChange = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };
  console.log(userInput);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const login = await axios.post(`/api/auth/login`, userInput);
      const data = login.data;
      if (data.success === false) {
        setLoading(false);
        console.log(data.message);
      }
      toast.success(data.message);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className="flex items-center justify-center text-3xl ">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h2 className="font-bold text-center ">Login</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <FormField
            id="email"
            label="Email Address"
            type="email"
            onChange={handleChange}
          />
          <FormField
            id="password"
            label="Password"
            type="password"
            onChange={handleChange}
          />
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="text-sm">
              <p>
                Don't have an account?
                <Link to={"/register"}>
                  <span className="font-medium text-indigo-600 hover:text-indigo-500">
                    Sign up
                  </span>
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
