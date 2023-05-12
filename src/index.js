import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Imports for React Router
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import App from './App';
import AuthentificationPage from './Pages/Authentification/AuthentificationPage';
import LandingPage from './Pages/LandingPage/LandingPage';
import JoinUsPage from './Pages/JoinUs/JoinUsPage';
import ErrorPage from './Pages/ErrorPage';


const root = ReactDOM.createRoot(document.getElementById('root'));

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/authentification",
    element: <AuthentificationPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/landingPage",
    element: <LandingPage />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/JoinUs",
    element: <JoinUsPage />,
    errorElement: <ErrorPage />,
  }
]);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// // If you want to start measuring performance in your app, pass a function
// // to log results (for example: reportWebVitals(console.log))
// // or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
