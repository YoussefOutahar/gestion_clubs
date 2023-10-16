import Loadable from "../../components/Loadable";
import { lazy } from "react";

import { UsersProvider } from "../../contexts/UsersContext";
import { ClubsProvider } from "../../contexts/ClubsContext";

const Dashboard = Loadable(lazy(() => import("./Dashboard/Analytics")));
const Clubs = Loadable(lazy(() => import("./Clubs-Management/Clubs")));
const Members = Loadable(lazy(() => import("./Member-Management/AdminClubsMembers")));
const Meetings = Loadable(lazy(() => import("./Meetings-Management/Meetings")));
const Events = Loadable(lazy(() => import("./Events-Management/Events")));

const AdminRoutes = [
    {
        path: "/Dashboard-Admin",
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
    {
        path: "/Meetings-Management-Admin",
        element: <Meetings />,
    },
    {
        path: "/Events-Management-Admin",
        element: <Events />,
    }
];

export default AdminRoutes;