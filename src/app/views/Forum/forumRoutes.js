import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Forum = Loadable(lazy(() => import("./ForumPage")));

const forumRoutes = [
    {
        path: '/forums',
        element: <Forum />,
    },
];

export default forumRoutes;