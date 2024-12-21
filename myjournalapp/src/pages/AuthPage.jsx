import React, { useState } from "react";
import { useAuth } from "../app/providers/AuthProvider"; // Используем хук useAuth
import { useNavigate } from "react-router-dom"; // Для перенаправления

const AuthPage = () => {
  const { login, register } = useAuth(); // Деструктурируем login и register
  const navigate = useNavigate(); // Хук для навигации
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Флаг для переключения между логином и регистрацией

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password); // Вызываем login
    navigate("/diary"); // Перенаправляем на страницу дневника
  };

  const handleRegister = (e) => {
    e.preventDefault();
    register(username, password); // Вызываем register
    navigate("/diary"); // Перенаправляем на страницу дневника
  };

  return (
    <div>
      <h2>{isRegistering ? "Register" : "Login"}</h2>
      <form onSubmit={isRegistering ? handleRegister : handleLogin}>
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
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </button>
    </div>
  );
};

export default AuthPage;
