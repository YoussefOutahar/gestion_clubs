import AuthGuard from './auth/AuthGuard';
import chartsRoute from './views/charts/ChartsRoute';
import dashboardRoutes from './views/dashboard/DashboardRoutes';
import materialRoutes from './views/material-kit/MaterialRoutes';
import landingPageRoute from './views/LandingPage/LandingPageRoute';
import FinanceRoutes from './views/FinanceManagement/FinanceRoutes';
import NotFound from './views/sessions/NotFound';
import sessionRoutes from './views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...chartsRoute, ...materialRoutes,...FinanceRoutes],
  },
  ...sessionRoutes,
  ...landingPageRoute,
  { path: '/', element: <Navigate to="dashboard/default" /> },  //TODO: This is where you handle user types redirections!!
  { path: '*', element: <NotFound /> },
];

export default routes;
