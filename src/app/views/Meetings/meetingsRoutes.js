import Loadable from "../../components/Loadable";
import { lazy } from "react";

const Meetings = Loadable(lazy(() => import("../Meetings/Meetings")));
const NewMeeting = Loadable(lazy(() => import("../Meetings/NewMeeting")));
const UpdateMeeting = Loadable(lazy(() => import("../Meetings/UpdateMeeting")));

const meetingRoutes = [
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
];

export default meetingRoutes;