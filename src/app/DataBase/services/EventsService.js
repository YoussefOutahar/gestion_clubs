import supabase from "../Clients/SupabaseClient";
import ClubsService from "./ClubsService";

export default class EventsService {
    static async addEvent(event) {
        const { data, error } = await supabase.from("Events").insert([event]);
        if (error) {
            console.error("Error adding event:", error);
        } else {
            console.log("Event added successfully");
        }
    };
    
    static async getEvents() {
        const { data, error } = await supabase.from("Events").select("*");
        if (error) {
            console.error("Error fetching events:", error);
        } else {
            return data;
        }
    };
    
    static async getEvent(id) {
        const { data, error } = await supabase.from("Events").select("*").eq("id", id);
        if (error) {
            console.error("Error fetching event:", error);
        } else {
            console.log("Fetched event:", data);
            return data;
        }
    };
    static async getEventByName(nom) {
        const { data, error } = await supabase.from("Events").select("*").eq("Name", nom);
        if (error) {
            console.error("Error fetching event:", error);
        } else {
            console.log("Fetched event:", data);
            return data;
        }
    };
    
    static async updateEvent(id, event) {
        const { data, error } = await supabase.from("Events").update(event).eq("id", id);
        if (error) {
            console.error("Error updating event:", error);
        } else {
            console.log("Event updated successfully");
        }
    };
    
    static async deleteEvent(id) {
        const { data, error } = await supabase.from("Events").delete().eq("id", id);
        if (error) {
            console.error("Error deleting event:", error);
        } else {
            console.log("Event deleted successfully");
        }
    };
    
    static async getEventClub(id) {
        let { data , error } = await supabase.from("club_activity").select("club_id").eq("activity_id", id).limit(1);
        if (error) {
            console.error("Error fetching event club:", error);
        } else {
            return ClubsService.getClub(data[0].club_id);
        }
    };
    
    static async addClubToEvent(club_id, event_id) {
        const { data, error } = await supabase.from("club_activity").insert([{ club_id: club_id, activity_id: event_id }]);
        if (error) {
            console.error("Error adding club to event:", error);
        } else {
            console.log("Club added to event successfully");
        }
    }
    
    
    static async getEventsByClub(id) {
        const { data, error } = await supabase.from("Events").select("*").eq("id__club", id);
        if (error) {
            console.error("Error deleting event:", error);
        } else {
            console.log("Event deleted successfully");
            return data;
        }
    };
}

export const addEvent = async (event) => {
    const { data, error } = await supabase.from("Events").insert([event]);
    if (error) {
        console.error("Error adding event:", error);
    } else {
        console.log("Event added successfully");
    }
};

export const getEvents = async () => {
    const { data, error } = await supabase.from("Events").select("*");
    if (error) {
        console.error("Error fetching events:", error);
    } else {
        return data;
    }
};

export const getEvent = async (id) => {
    const { data, error } = await supabase.from("Events").select("*").eq("id", id);
    if (error) {
        console.error("Error fetching event:", error);
    } else {
        console.log("Fetched event:", data);
        return data;
    }
};
export const getEventByName = async (nom) => {
    const { data, error } = await supabase.from("Events").select("*").eq("Name", nom);
    if (error) {
        console.error("Error fetching event:", error);
    } else {
        console.log("Fetched event:", data);
        return data;
    }
};

export const updateEvent = async (id, event) => {
    const { data, error } = await supabase.from("Events").update(event).eq("id", id);
    if (error) {
        console.error("Error updating event:", error);
    } else {
        console.log("Event updated successfully");
    }
};

export const deleteEvent = async (id) => {
    const { data, error } = await supabase.from("Events").delete().eq("id", id);
    if (error) {
        console.error("Error deleting event:", error);
    } else {
        console.log("Event deleted successfully");
    }
};

export const getEventClub = async (id) => {
    let { data , error } = await supabase.from("club_activity").select("club_id").eq("activity_id", id).limit(1);
    if (error) {
        console.error("Error fetching event club:", error);
    } else {
        return ClubsService.getClub(data[0].club_id);
    }
};

export const addClubToEvent = async (club_id, event_id) => {
    const { data, error } = await supabase.from("club_activity").insert([{ club_id: club_id, activity_id: event_id }]);
    if (error) {
        console.error("Error adding club to event:", error);
    } else {
        console.log("Club added to event successfully");
    }
}


export const getEventsByClub = async (id) => {
    const { data, error } = await supabase.from("Events").select("*").eq("id__club", id);
    if (error) {
        console.error("Error deleting event:", error);
    } else {
        console.log("Event deleted successfully");
        return data;
    }
};