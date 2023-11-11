import generalRoutes from "./views/General/generalRoutes";
import FinanceRoutes from "./views/FinanceManagement/FinanceRoutes";
import forumRoutes from "./Pages/Components/Forum/forumRoutes";
import clubsRoutes from "./views/Clubs/clubsRoutes";
import membersRoutes from "./views/Members/membersRoutes";
import eventsRoutes from "./views/Events/eventRoutes";
import meetingRoutes from "./views/Meetings/meetingsRoutes";

import landingPageRoute from "./Pages/LandingPage/LandingPageRoute";

import AdminRoutes from "./Pages/Admin-Pages/admin-routes";
import SupervisorRoutes from "./Pages/Supervisor-Pages/supervisor-routes";
import PresidentRoutes from "./Pages/President-Pages/president-routes";
import AccountantRoutes from "./Pages/Accountant-Pages/accountant-routes";
import SecretaryRoutes from "./Pages/Secretary-Pages/secretary-routes";

import AuthGuard from "./auth/AuthGuard";
import sessionRoutes from "./Pages/sessions/SessionRoutes";
import NotFound from "./Pages/sessions/NotFound";

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
            ...SupervisorRoutes,
            ...PresidentRoutes,
            ...AccountantRoutes,
            ...SecretaryRoutes,
            // 
            ...clubsRoutes,
            ...membersRoutes,
            ...eventsRoutes,
            ...meetingRoutes,
            ...FinanceRoutes,
            ...forumRoutes,
            ...generalRoutes,
        ],
    },
    ...sessionRoutes,
    ...landingPageRoute,
    { path: "/", element: <Navigate to="Dashboard-Admin" /> },
    { path: "*", element: <NotFound /> },
];

export default routes;
