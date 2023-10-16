import supabase from "../Clients/SupabaseClient";

export default class DocumentsService {
    static async getForumFromClub(clubId){
        const { data, error } = await supabase.from("Forums").select("*").eq("club_id", clubId);
        if (error) throw error;
        return data;
    };
    
    static async getForum(forumId) {
        const { data, error } = await supabase.from("Forums").select("*").eq("id", forumId);
        if (error) throw error;
        return data;
    };
    
    static async createForum(clubId, forumName, forumDescription) {
        const { data, error } = await supabase.from("Forums").insert([
            {
                club_id: clubId,
                name: forumName,
                description: forumDescription,
            },
        ]);
        if (error) throw error;
        return data;
    };
    
    static async updateForum(forumId, forumName, forumDescription) {
        const { data, error } = await supabase.from("Forums").update({
            name: forumName,
            description: forumDescription,
        }).eq("id", forumId);
        if (error) throw error;
        return data;
    };
    
    static async deleteForum(forumId) {
        const { data, error } = await supabase.from("Forums").delete().eq("id", forumId);
        if (error) throw error;
        return data;
    };
    
    static async getForumMessages(forumId) {
        const { data, error } = await supabase.from("Messages").select("*").eq("forum_id", forumId);
        if (error) throw error;
        return data;
    };
    
    static async getMessage(messageId) {
        const { data, error } = await supabase.from("Messages").select("*").eq("id", messageId);
        if (error) throw error;
        return data;
    };
    
    static async createMessage(forumId, userID , messageContent) {
        const { data, error } = await supabase.from("Messages").insert([
            {
                forum_id: forumId,
                user_id: userID,
                content: messageContent,
            },
        ]);
        if (error) throw error;
        return data;
    };
    
    static async updateMessage(messageId, messageContent) {
        const { data, error } = await supabase.from("Messages").update({
            content: messageContent,
        }).eq("id", messageId);
        if (error) throw error;
        return data;
    };
    
    static async deleteMessage(messageId) {
        const { data, error } = await supabase.from("Messages").delete().eq("id", messageId);
        if (error) throw error;
        return data;
    };

    static async getMessagesByForum(forumId) {
        const { data, error } = await supabase.from("Messages").select("*").eq("forum_id", forumId);
        if (error) throw error;
        return data;
    };
    
}


