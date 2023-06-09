import Loadable from '../../components/Loadable';
import { lazy } from 'react';

const FinancePage = Loadable(lazy(() => import('./FinancePage')));
const AddCharge = Loadable(lazy(() => import('./AddCharge')));
const Supp_Budget = Loadable(lazy(() => import('./Supp_Budget')));
const AssignBudget = Loadable(lazy(() => import('./AssignBudget')));
const AdminFinance = Loadable(lazy(() => import('./AdminFinance')));

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
    {
        path: "/AdminFinance",
        element: <AdminFinance/>,
    },

];

export default FinanceRoutes;