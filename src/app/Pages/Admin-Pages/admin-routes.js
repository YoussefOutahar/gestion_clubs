import Loadable from "../../components/Loadable";
import { lazy } from "react";

import { UsersProvider } from "../../contexts/UsersContext";
import { ClubsProvider } from "../../contexts/ClubsContext";

const Dashboard = Loadable(lazy(() => import("./Dashboard/Analytics")));
const Clubs = Loadable(lazy(() => import("./Clubs-Management/Clubs")));
const Members = Loadable(lazy(() => import("./Member-Management/AdminClubsMembers")));

const AdminRoutes = [
    {
        path: "/Dashboard",
        element: <Dashboard />,
    },
    {
        path: "/Clubs-Management-Admin",
        element: <ClubsProvider>
            <UsersProvider>
                <Clubs />
            </UsersProvider>
        </ClubsProvider>,
    },
    {
        path: "/Members-Management-Admin",
        element: <UsersProvider>
            <Members />
        </UsersProvider>,
    },
];

export default AdminRoutes;