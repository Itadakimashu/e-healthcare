import React, { useState } from "react";
import { User, Lock } from "lucide-react";
import api from "../api";
import { Navigate, useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";

const DoctorLoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/login/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      const { accesstoken, refreshtoken } = response.data;
      console.log("Login successful:", response.data);
      if (accesstoken) {
        localStorage.setItem(ACCESS_TOKEN, accesstoken);
        localStorage.setItem(REFRESH_TOKEN, refreshtoken);
        navigate("/");
      } else {
        console.error("Tokens not found in response");
      }
    } catch (error) {
      if (error.response) {
        console.error("Server Error:", error.response.data);
      } else if (error.request) {
        console.error("No Response:", error.request);
      } else {
        console.error("Error:", error.message);
      }
    }
    console.log("Login attempt:", formData);
  };

  const inputClass =
    "w-full px-3 py-2 pl-10 border rounded-lg transition duration-300 ease-in-out hover:border-blue-500 focus:border-blue-500 focus:outline-none";

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Doctor Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block mb-1 font-medium">
            Username
          </label>
          <div className="relative">
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
            <User
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <div>
          <label htmlFor="password" className="block mb-1 font-medium">
            Password
          </label>
          <div className="relative">
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={inputClass}
              required
            />
            <Lock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <label className="flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-4 w-4 text-blue-500 rounded focus:ring-blue-500"
            />
            <span className="ml-2 text-sm text-gray-600">Remember me</span>
          </label>
          <a href="#" className="text-sm text-blue-500 hover:underline">
            Forgot password?
          </a>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Log In
          </button>
        </div>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="/docregister" className="text-blue-500 hover:underline">
          Register here
        </a>
      </p>
      <p className="mt-4 text-center text-sm text-gray-600">
        Admin?{" "}
        <a href="/docregister" className="text-blue-500 hover:underline">
          Click here
        </a>
      </p>
    </div>
  );
};

export default DoctorLoginForm;
