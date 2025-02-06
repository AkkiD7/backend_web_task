import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(email, password);
      localStorage.setItem("token", response.data.token);
      navigate("/users");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6 md:p-8">
        <div className="w-full max-w-md">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-center text-gray-800">
            Login
          </h2>
          <div className="space-y-4 md:space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 md:py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>
            <button
              onClick={handleLogin}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 md:py-3 px-4 rounded-lg hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all"
            >
              Login
            </button>
          </div>
        </div>
      </div>

      <div className="hidden md:flex md:w-1/2 bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center p-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            User Management System
          </h1>
          <p className="text-lg md:text-xl text-white opacity-90">
            Streamline your user management with our powerful system.
          </p>
        </div>
      </div>

      <div className="flex md:hidden bg-gradient-to-r from-blue-500 to-purple-600 items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            User Management System
          </h1>
          <p className="text-sm text-white opacity-90">
            Manage users with ease, even on mobile!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
