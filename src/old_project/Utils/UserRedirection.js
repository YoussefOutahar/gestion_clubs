import supabase from "../DataBase/SupabaseClient";
import { useNavigate } from "react-router-dom";

export default function UserRedirection() {
    const navigate = useNavigate();
    const session = supabase.auth.session();

    if (session) {
        navigate("/userDashboard");
    } else {
        navigate("/landingPage");
    }
    return <></>;
}