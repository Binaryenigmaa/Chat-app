import React from "react";
import FormField from "../components/FormField";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center text-3xl ">
      <div className="w-full max-w-md p-8 space-y-6 bg-black rounded-lg shadow-md backdrop-filter backdrop-blur-lg bg-opacity-50">
        <h2 className="font-bold text-center ">Login</h2>
        <form className="space-y-4">
          <FormField id="email" label="Email Address" type="email" />
          <FormField id="password" label="Password" type="password" />
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 font-medium text-white bg-indigo-600 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign in
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
