import React, { useState } from "react";
import FormField from "../components/FormField.jsx";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { UseAuth } from "../context/AuthContext.jsx";

const Register = () => {
  const { setAuthUser } = UseAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInput, setUserInput] = useState({ gender: "male" });

  const changeHandler = (e) => {
    setUserInput({
      ...userInput,
      [e.target.id]: e.target.value,
    });
  };
  // console.log(userInput);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (userInput.password !== userInput.confpassword) {
      setLoading(false);
      return toast.error(`Passwords don't match`);
    }

    try {
      const register = await axios.post(`/api/auth/register`, userInput);
      const data = register.data;
      if (data.success === false) {
        setLoading(false);
        toast.error(data.message);
      }
      toast.success(`Registered Successfully`);
      localStorage.setItem("chatapp", JSON.stringify(data));
      setAuthUser(data);
      setLoading(false);
      navigate("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div className=" bg-black flex flex-col p-4 rounded-lg items-center w-full max-w-md text-3xl backdrop-filter backdrop-blur-lg bg-opacity-50 ">
      <h1>Register</h1>
      <form onSubmit={submitHandler}>
        <FormField
          id="fullname"
          label="Full name"
          type="text"
          onChange={changeHandler}
        />
        <FormField
          id="username"
          label="Username"
          type="Username"
          onChange={changeHandler}
        />
        <FormField
          id="email"
          label="Email Address"
          type="Email"
          onChange={changeHandler}
        />
        <FormField
          id="password"
          label="Password"
          type="password"
          onChange={changeHandler}
        />
        <FormField
          id="confpassword"
          label="Confirm Password"
          type="password"
          onChange={changeHandler}
        />
        <div className=" text-xl m-4">
          <label htmlFor="gender">Gender: </label>
          <select
            name="gender"
            id="gender"
            value={userInput.gender}
            onChange={changeHandler}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div>
          <button
            type="submit"
            className="w-min px-4 py-2 ml-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {loading ? "Registering" : "Register"}
          </button>
        </div>
        <div className="flex items-center justify-between text-sm p-2">
          <p>
            Already have an account?
            <Link to={"/login"}>
              <span className="font-medium text-indigo-600 hover:text-indigo-500">
                Login
              </span>
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Register;
