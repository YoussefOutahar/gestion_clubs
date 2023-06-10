import supabase from "./SupabaseClient";

export const addMessage = async (message) => {
    const { error } = await supabase.from("Messages").insert([message]);
    if (error) {
        return error;
    } else {
        console.log("Message added successfully");
    }
}

export const getMessages = async () => {
    const { data, error } = await supabase.from("Messages").select("*");
    if (error) {
        console.error("Error fetching messages:", error);
    } else {
        console.log("Fetched messages:", data);
        return data;
    }
}

export const getMessage = async (id) => {
    const { data, error } = await supabase.from("Messages").select("*").eq("id", id);
    if (error) {
        console.error("Error fetching message:", error);
    } else {
        console.log("Fetched message:", data);
        return data;
    }
}

export const updateMessage = async (id, message) => {
    const { data, error } = await supabase.from("Messages").update(message).eq("id", id);
    if (error) {
        console.error("Error updating message:", error);
    } else {
        console.log("Message updated successfully");
    }
}

export const deleteMessage = async (id) => {
    const { data, error } = await supabase.from("Messages").delete().eq("id", id);
    if (error) {
        console.error("Error deleting message:", error);
    } else {
        console.log("Message deleted successfully");
    }
}

export const getMessagesByForum = async (forum_id) => {
    const { data, error } = await supabase.from("Messages").select("*").eq("forum_id", forum_id);
    if (error) {
        console.error("Error fetching messages:", error);
    } else {
        console.log("Fetched messages:", data);
        return data;
    }
}