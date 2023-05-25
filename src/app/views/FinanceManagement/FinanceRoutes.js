import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const FinancePage = Loadable(lazy(() => import('./FinancePage')));

const FinanceRoutes = [
    {
        path: "/finance",
        component: <FinancePage/>,
    },
];

export default FinanceRoutes;