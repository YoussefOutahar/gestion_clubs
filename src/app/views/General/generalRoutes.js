import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Clubs = Loadable(lazy(() => import("./Clubs")));
const Members = Loadable(lazy(() => import("./Members")));
const Events = Loadable(lazy(() => import("./Events")));

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
];

export default generalRoutes;