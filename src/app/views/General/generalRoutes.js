import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Account = Loadable(lazy(() => import("./Account")));


const generalRoutes = [
    {
        path: "/account",
        element: <Account />,
    },
    
];

export default generalRoutes;