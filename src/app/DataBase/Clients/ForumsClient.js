import supabase from "./SupabaseClient";

export const getForumFromClub = async (clubId) => {
    const { data, error } = await supabase.from("Forums").select("*").eq("club_id", clubId);
    if (error) throw error;
    return data;
};

export const getForum = async (forumId) => {
    const { data, error } = await supabase.from("Forums").select("*").eq("id", forumId);
    if (error) throw error;
    return data;
};

export const createForum = async (clubId, forumName, forumDescription) => {
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

export const updateForum = async (forumId, forumName, forumDescription) => {
    const { data, error } = await supabase.from("Forums").update({
        name: forumName,
        description: forumDescription,
    }).eq("id", forumId);
    if (error) throw error;
    return data;
};

export const deleteForum = async (forumId) => {
    const { data, error } = await supabase.from("Forums").delete().eq("id", forumId);
    if (error) throw error;
    return data;
};

export const getForumMessages = async (forumId) => {
    const { data, error } = await supabase.from("Messages").select("*").eq("forum_id", forumId);
    if (error) throw error;
    return data;
};

export const getMessage = async (messageId) => {
    const { data, error } = await supabase.from("Messages").select("*").eq("id", messageId);
    if (error) throw error;
    return data;
};

export const createMessage = async (forumId, userID , messageContent) => {
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

export const updateMessage = async (messageId, messageContent) => {
    const { data, error } = await supabase.from("Messages").update({
        content: messageContent,
    }).eq("id", messageId);
    if (error) throw error;
    return data;
};

export const deleteMessage = async (messageId) => {
    const { data, error } = await supabase.from("Messages").delete().eq("id", messageId);
    if (error) throw error;
    return data;
};


