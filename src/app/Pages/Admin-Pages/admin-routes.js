import Loadable from "../../components/Loadable";
import { lazy } from "react";

import { UsersProvider } from "../../contexts/UsersContext";
import { ClubsProvider } from "../../contexts/ClubsContext";
import { MeetingsProvider } from "../../contexts/MeetingsContext";
import { EventsProvider } from "../../contexts/EventsContext";
import { BudgetsProvider } from "../../contexts/BudgetsContext";

const Dashboard = Loadable(lazy(() => import("./Dashboard/Analytics")));
const Clubs = Loadable(lazy(() => import("./Clubs-Management/Clubs")));
const Members = Loadable(lazy(() => import("./Member-Management/AdminClubsMembers")));
const Meetings = Loadable(lazy(() => import("./Meetings-Page/Meetings")));
const Events = Loadable(lazy(() => import("./Events-Management/Events")));
const Finance = Loadable(lazy(() => import("./Finance-Management/AdminFinance")));

// Validation Imports
const ClubValidation = Loadable(lazy(() => import("./Validation-Pages/Club-Validation")));
const EventsValidation = Loadable(lazy(() => import("./Validation-Pages/Event-Validation")));
const MeetingsValidation = Loadable(lazy(() => import("./Validation-Pages/Meeting-Validation")));

const AdminRoutes = [
    {
        path: "/Dashboard-Admin",
        element: <Dashboard />,
    },
    {
        path: "/Clubs-Management-Admin",
        element: (
            <ClubsProvider>
                <UsersProvider>
                    <Clubs />
                </UsersProvider>
            </ClubsProvider>
        ),
    },
    {
        path: "/Members-Management-Admin",
        element: (
            <UsersProvider>
                <Members />
            </UsersProvider>
        ),
    },
    {
        path: "/Meetings-Management-Admin",
        element: (
            <MeetingsProvider>
                <Meetings />
            </MeetingsProvider>
        ),
    },
    {
        path: "/Events-Management-Admin",
        element: (
            <EventsProvider>
                <Events />
            </EventsProvider>
        ),
    },
    {
        path: "/Finance-Management-Admin",
        element: (
            <BudgetsProvider>
                <Finance />
            </BudgetsProvider>
        ),
    },

    // Validation Routes
    {
        path: "/Clubs-Validation",
        element: <ClubsProvider>
            <ClubValidation />
        </ClubsProvider>,
    },
    {
        path: "/Events-Validation",
        element: (
            <EventsProvider>
                <EventsValidation />
            </EventsProvider>
        ),
    },
    {
        path: "/Meetings-Validation",
        element: <MeetingsValidation />,
    },
];

export default AdminRoutes;
