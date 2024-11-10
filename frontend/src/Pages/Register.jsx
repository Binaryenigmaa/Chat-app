import React, { useState } from "react";
import FormField from "../components/FormField.jsx";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className=" bg-black flex flex-col p-4 rounded-lg items-center w-full max-w-md text-3xl backdrop-filter backdrop-blur-lg bg-opacity-50 ">
      <h1>Register</h1>
      <form>
        <FormField id="name" label="Full name" type="text" />
        <FormField id="username" label="Username" type="Username" />
        <FormField id="email" label="Email Address" type="Email" />
        <FormField id="password" label="Password" type="password" />
        <FormField
          id="passwordcheck"
          label="Confirm Password"
          type="password"
        />
        <div>
          <button
            type="submit"
            className="w-min px-4 py-2 ml-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Register
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
