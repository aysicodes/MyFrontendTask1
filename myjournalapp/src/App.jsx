import React from "react";
import { useRoutes } from "react-router-dom";
import DiaryPage from "./pages/DiaryPage";
import AuthPage from "./pages/AuthPage";
import { AuthProvider } from "./app/providers/AuthProvider"; // Подключаем AuthProvider

const App = () => {
  const routes = [
    { path: "/", element: <AuthPage /> },
    { path: "/diary", element: <DiaryPage /> },
  ];

  const routing = useRoutes(routes);

  return (
    // Оборачиваем весь роутинг в AuthProvider
    <AuthProvider>
      {routing}
    </AuthProvider>
  );
};

export default App;
