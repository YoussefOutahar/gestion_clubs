import Dve_validationPage from "./Dve_validation-Page";
import Supervisor_validationPage from "./Supervisor_ValidationPage";
import NewClubDetails from "./NewClubDetails";


const generalRoutes = [
    {
        path: "/dve_validationPage",
        element: <Dve_validationPage />
    },
    {
        path: "/newClubDetails/:clubName",
        element: <NewClubDetails />
    },
    {
        path: "/supervisor_validationPage",
        element: <Supervisor_validationPage />
    }

];

export default generalRoutes;