import Loadable from "../../../components/Loadable";
import { lazy } from "react";

const Forum = Loadable(lazy(() => import("./ForumPage")));
const Account = Loadable(lazy(() => import("./Account")));


const forumRoutes = [
    {
        path: '/forums',
        element: <Forum />,
    },
    {
        path: "session/account",
        element: <Account />,
    },
];

export default forumRoutes;