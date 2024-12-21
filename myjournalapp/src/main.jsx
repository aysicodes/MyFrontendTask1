// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client'; // Импортируем createRoot
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { DiaryProvider } from './app/providers/DiaryProvider';

const root = ReactDOM.createRoot(document.getElementById('root')); // Создаем корень приложения
root.render(
  <BrowserRouter>
    <DiaryProvider>
      <App />
    </DiaryProvider>
  </BrowserRouter>
);
