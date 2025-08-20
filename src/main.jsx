import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import Layout from './components/Layout.jsx';
import SpellsPage from './pages/SpellsPage.jsx';
import StudentsPage from './pages/StudentsPage.jsx'; // Import Students page
import StaffPage from './pages/StaffPage.jsx';     // Import Staff page
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: 'students', element: <StudentsPage /> }, // Add students route
      { path: 'staff', element: <StaffPage /> },       // Add staff route
      { path: 'spells', element: <SpellsPage /> }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);