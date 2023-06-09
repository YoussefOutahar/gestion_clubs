import ProtectedRoute from "./Utils/ProtectedRoute";
import AuthentificationPage from "./Pages/Authentification/AuthentificationPage";
import JoinUsPage from "./Pages/JoinUs/JoinUsPage";
import { ProSidebarProvider } from 'react-pro-sidebar';
import LandingPage from "./Pages/LandingPage/LandingPage";
import FinancePage from "./Pages/FinanceManagement/FinancePage";
import ErrorPage from "./Pages/ErrorPage";

//Admin Dashboard screens imports
import AdminDashBoardPage from "./Pages/AdminDashboard/AdminDashBoardPage";
import ChartsPage from "./Pages/AdminDashboard/Screens/Charts";
import CalendarPage from "./Pages/AdminDashboard/Screens/Calendar";
import ClubsPage from "./Pages/AdminDashboard/Screens/Clubs";
import SettingsPage from "./Pages/AdminDashboard/Screens/Settings";
import MembersPage  from "./Pages/AdminDashboard/Screens/Members";

//User Dashboard screens imports
import UserDashboardPage from "./Pages/UserDashboard/UserDashboardPage";
import UserClubsPage from "./Pages/UserDashboard/Screens/MyClubs";
import UserCalendarPage from "./Pages/UserDashboard/Screens/Calendar";
import UserForumsPage from "./Pages/UserDashboard/Screens/Forums";
import UserMembersPage  from "./Pages/UserDashboard/Screens/Members";
import UserSettingsPage from "./Pages/UserDashboard/Screens/Settings";

let routes = [
    {
        path: "/",
        element: <LandingPage />,
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
        path: "/FinancePage",
        element: <FinancePage />,
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
                path: "/adminDashboard/Charts",
                element: <ChartsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/adminDashboard/Calendar",
                element: <CalendarPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/adminDashboard/Clubs",
                element: <ClubsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/adminDashboard/Members",
                element: <MembersPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/adminDashboard/Settings",
                element: <SettingsPage />,
                errorElement: <ErrorPage />,
            },
        ]
    },
    {
        path: "/userDashboard",
        element: (
            <ProtectedRoute>
                <ProSidebarProvider>
                    <UserDashboardPage />
                </ProSidebarProvider>
            </ProtectedRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
            {
                path: "/userDashboard/myClubs",
                element: <UserClubsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/userDashboard/Calendar",
                element: <UserCalendarPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/userDashboard/Forums",
                element: <UserForumsPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/userDashboard/Members",
                element: <UserMembersPage />,
                errorElement: <ErrorPage />,
            },
            {
                path: "/userDashboard/Settings",
                element: <UserSettingsPage />,
                errorElement: <ErrorPage />,
            },
        ]
    },
];

export default routes;