import Loadable from "../../components/Loadable";
import { lazy } from "react";


const MyCLub = Loadable(lazy(() => import("../Clubs/MyClubPage")));
const Clubs = Loadable(lazy(() => import("../Clubs/Clubs")));

const clubsRoutes = [
    {
        path: "/clubs",
        element: <Clubs />,
    },
    {
        path: "/UserClub",
        element: <MyCLub/>
    }
];

export default clubsRoutes;