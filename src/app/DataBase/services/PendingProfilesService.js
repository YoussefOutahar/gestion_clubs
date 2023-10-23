import supabase from "../Clients/SupabaseClient";

export default class PendingProfilesService {
    static async addPendingProfile(user) {
        try {
            const { data, error } = await supabase.from("pending_profiles").insert([user]).select();
            if (error) throw error;
            return data[0];
        } catch (err) {
            console.log(err);
        }
    };

    static async getPendingProfileById(id) {
        try {
            const { data, error } = await supabase.from("pending_profiles").select("*").eq("id", id);
            if (error) throw error;
            return data[0];
        } catch (err) {
            console.log(err);
        }
    };

    static async getPendingProfilesByClubName(name) {
        const { data, error } = await supabase.from("pending_profiles").select("*").eq("clubName", name);
        if (error) return error;
        else {
            console.log("club data :", data);
            return data;
        }
    };

    static async getPendingProfileByClubId(id) {
        const { data, error } = await supabase.from("pending_profiles").select("*").eq("id_club", id);
        if (error) return error;
        else {
            console.log("club data :", data);
            return data;
        }
    }
}
