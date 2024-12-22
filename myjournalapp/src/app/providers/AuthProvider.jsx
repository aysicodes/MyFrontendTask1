import React, { createContext, useContext, useState, useEffect } from "react";

// Создание контекста
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
  const login = (username, password) => {
    setUser({ username }); // Пример: в реальном проекте можно отправить запрос на сервер
    localStorage.setItem("user", JSON.stringify({ username })); // Сохраняем пользователя в localStorage
  };

  // Логика для регистрации
  const register = (username, password) => {
    setUser({ username }); // Пример: в реальном проекте можно отправить запрос на сервер
    localStorage.setItem("user", JSON.stringify({ username })); // Сохраняем пользователя в localStorage
  };

  // Проверка состояния пользователя при инициализации
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser)); // Если есть пользователь в localStorage, восстанавливаем состояние
    }
  }, []);

  const value = {
    user,
    login,
    register, // Добавляем функцию регистрации
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
