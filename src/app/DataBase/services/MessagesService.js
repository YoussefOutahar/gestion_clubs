import supabase from "../Clients/SupabaseClient";

export default class MessagesService {

    static async addMessage(message) {
        const { error } = await supabase.from("Messages").insert([message]);
        if (error) {
            return error;
        } else {
            console.log("Message added successfully");
        }
    }
    
    static async getMessages() {
        const { data, error } = await supabase.from("Messages").select("*");
        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            console.log("Fetched messages:", data);
            return data;
        }
    }
    
    static async getMessage(id) {
        const { data, error } = await supabase.from("Messages").select("*").eq("id", id);
        if (error) {
            console.error("Error fetching message:", error);
        } else {
            console.log("Fetched message:", data);
            return data;
        }
    }
    
    static async updateMessage(id, message) {
        const { data, error } = await supabase.from("Messages").update(message).eq("id", id);
        if (error) {
            console.error("Error updating message:", error);
        } else {
            console.log("Message updated successfully");
        }
    }
    
    static async deleteMessage(id) {
        const { data, error } = await supabase.from("Messages").delete().eq("id", id);
        if (error) {
            console.error("Error deleting message:", error);
        } else {
            console.log("Message deleted successfully");
        }
    }
    
    static async getMessagesByForum(forum_id) {
        const { data, error } = await supabase.from("Messages").select("*").eq("forum_id", forum_id);
        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            console.log("Fetched messages:", data);
            return data;
        }
    }

}