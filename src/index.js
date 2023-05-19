import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

// Imports for React Router
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ProtectedRoute from "./Utils/ProtectedRoute";
import App from "./App";
import AuthentificationPage from "./Pages/Authentification/AuthentificationPage";
import JoinUsPage from "./Pages/JoinUs/JoinUsPage";
import AdminDashBoardPage from "./Pages/AdminDashboard/AdminDashBoardPage";
import { ProSidebarProvider } from 'react-pro-sidebar';
import LandingPage from "./Pages/LandingPage/LandingPage";
import ErrorPage from "./Pages/ErrorPage";

const root = ReactDOM.createRoot(document.getElementById("root"));

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
        path: "/joinUs",
        element: <JoinUsPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/landingPage",
        element: <LandingPage />,
        errorElement: <ErrorPage />,
    },
    {
        path: "/adminDashboard",
        element: (
            <ProtectedRoute>
                <ProSidebarProvider>
                    <AdminDashBoardPage />
                </ProSidebarProvider>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/adminDashboard/test",
                element: <h1>Admin Dashboard</h1>,
                errorElement: <ErrorPage />,
            
            }
        ]
    },
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
