// src/App.jsx
import React from "react";
import { useRoutes } from "react-router-dom";
import HomePage from "./pages/HomePage"; // Импортируем HomePage
import AuthPage from "./pages/AuthPage"; // Страница для логина/регистрации
import DiaryPage from "./pages/DiaryPage"; // Страница дневника
import { AuthProvider } from "./app/providers/AuthProvider"; // Подключаем AuthProvider
import './App.css';

const App = () => {
  const routes = [
    { path: "/", element: <HomePage /> }, // Путь для главной страницы
    { path: "/auth", element: <AuthPage /> },
    { path: "/diary", element: <DiaryPage /> },
  ];

  const routing = useRoutes(routes);

  return (
    <AuthProvider>
      {routing}
    </AuthProvider>
  );
};

export default App;
