import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const FinancePage = Loadable(lazy(() => import('./FinancePage')));
const AddCharge = Loadable(lazy(() => import('./AddCharge')));
const Supp_Budget = Loadable(lazy(() => import('./Supp_Budget')));
const AssignBudget = Loadable(lazy(() => import('./AssignBudget')));

const FinanceRoutes = [
    {
        path: "/finance",
        element: <FinancePage/>,
    },
    {
        path: "/AddCharge",
        element: <AddCharge/>,
    },
    {
        path: "/Supp_Budget",
        element: <Supp_Budget/>,
    },
    {
        path: "/AssignBudget",
        element: <AssignBudget/>,
    },

];

export default FinanceRoutes;