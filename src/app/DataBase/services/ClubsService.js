import supabase from "../Clients/SupabaseClient";
import EventsService from "./EventsService";

export default class ClubsService {
    static async addClub(club) {
        const { data, error } = await supabase.from("Clubs").insert([club]).select();
        if (error) {
            console.error("Error adding club:", error);
        }
        return data[0];
    }

    static async getClubs() {
        const { data, error } = await supabase.from("Clubs").select("*");
        if (error) return error;
        else return data;
    }

    static async getActiveClubs() {
        const { data, error } = await supabase.from("Clubs").select("*").eq("state", "active");
        if (error) return error;
        else return data;
    }

    static async getClub(id) {
        const { data, error } = await supabase.from("Clubs").select("*").eq("id", id);
        if (error) return error;
        else return data;
    }

    static async getClubByName(name) {
        const { data, error } = await supabase.from("Clubs").select("*").eq("name", name);
        if (error) return error;
        else {
            console.log("club data :", data);
            return data;
        }
    }

    static async updateClub(id, club) {
        const { error } = await supabase.from("Clubs").update(club).eq("id", id);
        if (error) {
            console.error("Error updating club:", error);
        } else {
            console.log("Club updated successfully");
        }
    }

    static async updateClubState(id, newState) {
        const { error } = await supabase.from("Clubs").update({ state: newState }).eq("id", id);
        if (error) {
            console.error("Error updating club state:", error);
        } else {
            console.log("Club state updated successfully");
        }
    }

    static async deleteClub(id) {
        const { error } = await supabase.from("Clubs").delete().eq("id", id);
        if (error) {
            console.error("Error deleting club:", error);
        } else {
            console.log("Club deleted successfully");
        }
    }

    static async getClubMembers(id) {
        const { data, error } = await supabase.from("Membre").select("*").eq("id_club", id);
        if (error) {
            console.error("Error fetching club members:", error);
        } else {
            return data;
        }
    }

    static async getClubEvents(id) {
        let Events = [];
        const { data, error } = await supabase.from("club_activity").select("*").eq("club_id", id);
        if (error) {
            console.error("Error fetching club events:", error);
        } else {
            for (let i = 0; i < data.length; i++) {
                Events.push(await EventsService.getEvent(data[i].activity_id));
            }
            return Events;
        }
    }

    static async addEventToClub(club_id, event_id) {
        const { data, error } = await supabase
            .from("club_activity")
            .insert([{ club_id: club_id, activity_id: event_id }]);
        if (error) {
            console.error("Error adding event to club:", error);
        } else {
            console.log("Event added to club successfully");
        }
    }
    static async getClubCategory(club) {
        const { data, error } = await supabase.from("Category").select("*").eq("id", club.id_category);
        if (error) return error;
        else {
            console.log(data);
            return data[0].category_name;
        }
    }

    static async getAllCategories() {
        const { data, error } = await supabase.from("Category").select("*");
        if (error) return error;
        else {
            console.log(data);
            return data;
        }
    }

    static async addClubLogo(club_id, logo) {
        const { data, error } = await supabase.storage
            .from("Clubs_Logo")
            .upload(club_id + "/" + logo.name, logo.name);
        if (error) {
            console.error("Error uploading club logo:", error);
        }
        // add clob logo to club table
        const { error2 } = await supabase.from("Clubs").update({ logo: logo.name }).eq("id", club_id);
        return data;
    }

    static async getClubLogoLink(club_id) {
        const { data, error } = await supabase.storage.from("Clubs_Logo").list(club_id + "/");

        if (error) {
            console.error("Error downloading club logo:", error);
        }

        console.log(data);

        // const link =
        //     "https://vussefkqdtgdosoytjch.supabase.co/storage/v1/object/public/Clubs_Logo/" +
        //     club_id +
        //     "/" +
        //     data[0].name;

        // return link;

        return ""
    }
}
