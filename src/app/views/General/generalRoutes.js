import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Clubs = Loadable(lazy(() => import("./Clubs")));
const Members = Loadable(lazy(() => import("./Members")));
const Events = Loadable(lazy(() => import("./Events")));
const Account = Loadable(lazy(() => import("./Account")));
const Meetings = Loadable(lazy(() => import("./Meetings")));
const AdminClubsMembers = Loadable(lazy(() => import("./AdminClubsMembers")));
const Statistics = Loadable(lazy(() => import("./statistics")));

const generalRoutes = [
    {
        path: "/clubs",
        element: <Clubs />,
    },
    {
        path: "/members",
        element: <Members />,
    },
    {
        path: "/events",
        element: <Events />,
    },
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/meetings",
        element: <Meetings />,
    },
    {
        path: "/adminClubsMembers",
        element: <AdminClubsMembers />,
    },
    {
        path: "/statistics",
        element: < Statistics />,
    },
];

export default generalRoutes;