import Loadable from "../../components/Loadable";
import { lazy } from "react";


const NewEvent = Loadable(lazy(() => import("../Events/NewEvent")));
const ValidationEvent = Loadable(lazy(() => import("../Events/ValidationEvent")));
const Events = Loadable(lazy(() => import("../Events/Events")));
const ValidationPage = Loadable(lazy(() => import("../Events/ValidationPage")));

const eventRoutes = [
    {
        path: "/new_event",
        element: <NewEvent />,
    },
    {
        path: "/validationEvent/:Name/:Date/:Description/:Location/:notifId",
        element: <ValidationEvent/>
    },
    {
        path: "/events",
        element: <Events />,
    },
    {
        path: "/validationPage/:Cost/:Event/:notifId",
        element: <ValidationPage/>
    },
];

export default eventRoutes;