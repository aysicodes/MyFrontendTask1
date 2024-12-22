import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Логика для логина
  const login = (username) => {
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username })); // Сохраняем в localStorage
  };

  // Логика для регистрации
  const register = (username) => {
    setUser({ username });
    localStorage.setItem("user", JSON.stringify({ username })); // Сохраняем в localStorage
  };

  // Проверка состояния пользователя при инициализации
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Восстанавливаем пользователя из localStorage
    }
  }, []);

  const value = {
    user,
    login,
    register,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
