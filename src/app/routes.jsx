import chartsRoute from "./views/charts/ChartsRoute";
import dashboardRoutes from "./views/dashboard/DashboardRoutes";
import materialRoutes from "./views/material-kit/MaterialRoutes";
import summaryRoutes from "./views/Summary/summaryRoutes";
import generalRoutes from "./views/General/generalRoutes";
import FinanceRoutes from "./views/FinanceManagement/FinanceRoutes";
import forumRoutes from "./views/Forum/forumRoutes";
import clubsRoutes from "./views/Clubs/clubsRoutes";
import membersRoutes from "./views/Members/membersRoutes";
import eventsRoutes from "./views/Events/eventRoutes";
import meetingRoutes from "./views/Meetings/meetingsRoutes";

import landingPageRoute from "./views/LandingPage/LandingPageRoute";

import AdminRoutes from "./Pages/Admin-Pages/admin-routes";

import AuthGuard from "./auth/AuthGuard";
import sessionRoutes from "./views/sessions/SessionRoutes";
import NotFound from "./views/sessions/NotFound";

import { Navigate } from "react-router-dom";
import MatxLayout from "./components/MatxLayout/MatxLayout";

const routes = [
    {
        element: (
            <AuthGuard>
                <MatxLayout />
            </AuthGuard>
        ),
        children: [
            ...AdminRoutes,
            ...dashboardRoutes,
            ...summaryRoutes,
            ...clubsRoutes,
            ...membersRoutes,
            ...eventsRoutes,
            ...meetingRoutes,
            ...FinanceRoutes,
            ...forumRoutes,
            ...generalRoutes,
            ...materialRoutes,
            ...chartsRoute,
        ],
    },
    ...sessionRoutes,
    ...landingPageRoute,
    { path: "/", element: <Navigate to="dashboard/default" /> },
    { path: "*", element: <NotFound /> },
];

export default routes;
