import Loadable from '../../components/Loadable';
import { lazy } from 'react';
import { authRoles } from '../../auth/authRoles';
import { UsersProvider } from '../../contexts/UsersContext';

const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard/default', element: <UsersProvider><Analytics/></UsersProvider>, auth: authRoles.admin },
];

export default dashboardRoutes;
