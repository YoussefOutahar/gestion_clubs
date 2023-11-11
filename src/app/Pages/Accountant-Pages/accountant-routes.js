import Loadable from "../../components/Loadable";
import { lazy } from "react";

import { UsersProvider } from "../../contexts/UsersContext";
import { ClubsProvider } from "../../contexts/ClubsContext";
import { MeetingsProvider } from "../../contexts/MeetingsContext";
import { EventsProvider } from "../../contexts/EventsContext";
import { BudgetsProvider } from "../../contexts/BudgetsContext";

const Dashboard = Loadable(lazy(() => import("./Dashboard/Analytics")));
const Clubs = Loadable(lazy(() => import("./Club-Management/MyClub")));
const Members = Loadable(lazy(() => import("./Members-Management/Members")));
const Meetings = Loadable(lazy(() => import("./Meetings-Management/Meetings")));
const Events = Loadable(lazy(() => import("./Events-Management/Events")));
const Finance = Loadable(lazy(() => import("./Finance-Management/FinancePage")));


const AccountantRoutes = [
    {
        path: "/Dashboard-Club",
        element: <Dashboard />,
    },
    {
        path: "/Clubs-Management-Club",
        element: (
            <ClubsProvider>
                <UsersProvider>
                    <Clubs />
                </UsersProvider>
            </ClubsProvider>
        ),
    },
    {
        path: "/Members-Management-Club",
        element: (
            <UsersProvider>
                <Members />
            </UsersProvider>
        ),
    },
    {
        path: "/Meetings-Management-Club",
        element: (
            <MeetingsProvider>
                <Meetings />
            </MeetingsProvider>
        ),
    },
    {
        path: "/Events-Management-Club",
        element: (
            <EventsProvider>
                <Events />
            </EventsProvider>
        ),
    },
    {
        path: "/Finance-Management-Club",
        element: (
            <BudgetsProvider>
                <Finance />
            </BudgetsProvider>
        ),
    },

    // Validation Routes
    // {
    //     path: "/Clubs-Validation",
    //     element: <ClubsProvider>
    //         <ClubValidation />
    //     </ClubsProvider>,
    // },
    // {
    //     path: "/Events-Validation",
    //     element: (
    //         <EventsProvider>
    //             <EventsValidation />
    //         </EventsProvider>
    //     ),
    // },
    // {
    //     path: "/Meetings-Validation",
    //     element: <MeetingsValidation />,
    // },
];

export default AccountantRoutes;
