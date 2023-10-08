import Loadable from "../../components/Loadable";
import { lazy } from "react";


const Members = Loadable(lazy(() => import("../Members/Members")));
const AdminClubsMembers = Loadable(lazy(() => import("../Members/AdminClubsMembers")));

const membersRoutes = [
    {
        path: "/members",
        element: <Members />,
    },
    {
        path: "/adminClubsMembers",
        element: <AdminClubsMembers />,
    },
];

export default membersRoutes;