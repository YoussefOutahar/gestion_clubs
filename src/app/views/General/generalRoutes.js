import Loadable from "../../components/Loadable";
import { lazy } from "react";
import Dve_validationPage from "./Dve_validation-Page";
import NewClubDetails from "./NewClubDetails";

const Account = Loadable(lazy(() => import("./Account")));


const generalRoutes = [
    {
        path: "/account",
        element: <Account />,
    },
    {
        path: "/dve_validationPage",
        element: <Dve_validationPage />
    },
    {
        path: "/newClubDetails/:clubName",
        element: <NewClubDetails />
    }

];

export default generalRoutes;