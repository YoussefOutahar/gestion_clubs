import Loadable from "../../components/Loadable";
import { lazy } from "react";

import { ClubsProvider } from "../../contexts/ClubsContext";
import { EventsProvider } from "../../contexts/EventsContext";

const ClubsValidationPage = Loadable(lazy(() => import("./Validation-Pages/Clubs-Validation")));
const EventsValidationPage = Loadable(lazy(() => import("./Validation-Pages/Events-Validation")));

const SupervisorRoutes = [
    {
        path: "/Supervisor/Clubs-Validation",
        element: (
            <ClubsProvider>
                <ClubsValidationPage />
            </ClubsProvider>
        ),
    },
    {
        path: "/Supervisor/Events-Validation",
        element: (
            <EventsProvider>
                <EventsValidationPage />
            </EventsProvider>
        ),
    },
];

export default SupervisorRoutes;
