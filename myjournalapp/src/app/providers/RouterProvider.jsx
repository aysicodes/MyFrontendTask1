import { BrowserRouter, Routes, Route } from "react-router-dom";
import DiaryPage from "../../pages/DiaryPage";
import AuthPage from "../../pages/AuthPage";

const RouterProvider = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DiaryPage />} />
        <Route path="/auth" element={<AuthPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default RouterProvider;
