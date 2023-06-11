import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Clubs = Loadable(lazy(() => import("./Clubs")));
const Members = Loadable(lazy(() => import("./Members")));
const Events = Loadable(lazy(() => import("./Events")));
const Account = Loadable(lazy(() => import("./Account")));
const Meetings = Loadable(lazy(() => import("./Meetings")));
const NewMeeting = Loadable(lazy(() => import("./NewMeeting")));
const NewEvent = Loadable(lazy(() => import("./NewEvent")));
const UpdateMeeting = Loadable(lazy(() => import("./UpdateMeeting")));
const AdminClubsMembers = Loadable(lazy(() => import("./AdminClubsMembers")));
const Statistics = Loadable(lazy(() => import("./statistics")));
const ValidationPage = Loadable(lazy(() => import("./ValidationPage")));

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
    {
        path: "/new_event",
        element: <NewEvent />,
    },
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/meetings",
        element: <Meetings />,
    },
    {
        path: "/new_meeting",
        element: <NewMeeting />,
    },
    {
        path: "/update_meeting/:meetingId",
        element: <UpdateMeeting />,
    },
    {
        path: "/adminClubsMembers",
        element: <AdminClubsMembers />,
    },
    {
        path: "/statistics",
        element: < Statistics />,
    },
    {
        path: "/validationPage/:notifId",
        element: <ValidationPage/>
    }
];

export default generalRoutes;