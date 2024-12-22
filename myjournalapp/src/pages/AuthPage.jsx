// src/pages/AuthPage.jsx
import React, { useState } from "react";
import { useAuth } from "../app/providers/AuthProvider";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const { login, register } = useAuth(); // Используем хук для логина и регистрации
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Флаг для переключения между регистрацией и логином

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isRegistering) {
        await register(username, password); // Регистрируем пользователя
      } else {
        await login(username, password); // Логиним пользователя
      }
      navigate("/diary"); // После успешной регистрации/логина перенаправляем на страницу дневника
    } catch (err) {
      console.error("Authentication error:", err);
    }
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">{isRegistering ? "Register" : "Login"}</button>
      </form>
      <button onClick={() => setIsRegistering(!isRegistering)}>
        {isRegistering
          ? "Already have an account? Login"
          : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthPage;
