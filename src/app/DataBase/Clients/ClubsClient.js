import supabase from "./SupabaseClient";
import { getEvent } from "./EventsClient";

export const addClub = async (club) => {
    const { data, error } = await supabase.from("Clubs").insert([club]);
    if (error) {
        console.error("Error adding club:", error);
    } else {
        console.log("Club added successfully");
    }
};

export const getClubs = async () => {
    const { data, error } = await supabase.from("Clubs").select("*");
    if (error) {
        console.error("Error fetching clubs:", error);
    } else {
        console.log("Fetched clubs:", data);
        return data;
    }
};

export const getClub = async (id) => {
    const { data, error } = await supabase.from("Clubs").select("*").eq("id", id);
    if (error) {
        console.error("Error fetching club:", error);
    } else {
        console.log("Fetched club:", data);
        return data;
    }
};

export const updateClub = async (id, club) => {
    const { data, error } = await supabase.from("Clubs").update(club).eq("id", id);
    if (error) {
        console.error("Error updating club:", error);
    } else {
        console.log("Club updated successfully");
    }
};

export const deleteClub = async (id) => {
    const { data, error } = await supabase.from("Clubs").delete().eq("id", id);
    if (error) {
        console.error("Error deleting club:", error);
    } else {
        console.log("Club deleted successfully");
    }
};

export const getClubEvents = async (id) => {
    let Events = [];
    const { data, error } = await supabase.from('club_activity').select("*").eq("club_id", id);
    if (error) {
        console.error("Error fetching club events:", error);
    } else {
        for (let i = 0; i < data.length; i++) {
            Events.push(await getEvent(data[i].activity_id));
        }
        return Events;
    }
};

export const addEventToClub = async (club_id, event_id) => {
    const { data, error } = await supabase.from("club_activity").insert([{ club_id: club_id, activity_id: event_id }]);
    if (error) {
        console.error("Error adding event to club:", error);
    } else {
        console.log("Event added to club successfully");
    }
};
