import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const Summary = Loadable(lazy(() => import('./Summary')));
const SummaryClubs = Loadable(lazy(() => import('./SummaryClubs')));
const SummaryMembers = Loadable(lazy(() => import('./SummaryMembers')));
const SummaryEvents = Loadable(lazy(() => import('./SummaryEvents')));


const summaryRoutes = [
    { path: '/summary/global', element: <Summary /> },
    { path: '/summary/clubs', element: <SummaryClubs /> },
    { path: '/summary/members', element: <SummaryMembers /> },
    { path: '/summary/events', element: <SummaryEvents /> },
];

export default summaryRoutes;