// src/index.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from './providers/AuthProvider';
import RouterProvider from './providers/RouterProvider';
import { DiaryProvider } from './providers/DiaryProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <DiaryProvider> {/* Wrapping with DiaryProvider */}
        <RouterProvider />
      </DiaryProvider>
    </AuthProvider>
  </React.StrictMode>
);
