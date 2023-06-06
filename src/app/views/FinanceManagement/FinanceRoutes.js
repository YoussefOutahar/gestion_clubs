import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const FinancePage = Loadable(lazy(() => import('./FinancePage')));
const AddCharge = Loadable(lazy(() => import('./AddCharge')));

const FinanceRoutes = [
    {
        path: "/finance",
        element: <FinancePage/>,
    },
    {
        path: "/AddCharge",
        element: <AddCharge/>,
    },
];

export default FinanceRoutes;