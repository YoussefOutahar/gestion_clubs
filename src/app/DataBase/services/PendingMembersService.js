import supabase from "../Clients/SupabaseClient";
import ClubsService from "./ClubsService";

export default class PendingMembersService {
    static async addMember(user) {
        try {
            const { data, error } = await supabase.from("Pending_members").insert([user]);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async getMemberById(id) {
        try {
            const { data, error } = await supabase.from("Pending_members").select("*").eq("id", id);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async getMembersByClubName(name) {
        const { data, error } = await supabase.from("Pending_members").select("*").eq("clubName", name);
        if (error) return error;
        else {
            console.log("club data :", data);
            return data;
        }
    };
}
