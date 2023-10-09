import Loadable from '../../components/Loadable';
import { lazy } from 'react';

import LandingPage from "./LandingPage";
import Createclub from "./CreateClub";
const JwtRegister = Loadable(lazy(() => import('../sessions/JwtRegister')));

const landingPageRoute = [
    {
        path: "/LandingPage",
        element: <LandingPage />
    },
    {
        path: "/session/signup/:clubId",
        element: <JwtRegister/>
    },
    {
        path: "/Createclub",
        element: <Createclub/>
    }
];

export default landingPageRoute;