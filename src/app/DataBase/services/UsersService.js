import supabase from "../Clients/SupabaseClient";

//Get Current User
export const getCurrentUser = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession();
    const user = session?.user;

    return user;
};

//Get all profiles:
export const getAllProfiles = async () => {
    try {
        const { data, error } = await supabase.from("profiles").select("*").order("id", { ascending: true });
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
};

//Get profile by id:
export const getProfileById = async (id) => {
    try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id", id);
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
};

//Get profile by email:
export const getProfileByEmail = async (email) => {
    try {
        const { users, error } = await supabase.from("users").select("*").eq("email", email);
        if (error) throw error;
        const { data, error2 } = await supabase.from("profiles").select("*").eq("id", users[0].id);
        if (error2) throw error2;
        return [
            {
                id: data[0].id,
                role: data[0].role,
                name: data[0].name,
                email: users[0].email,
                avatar: data[0].avatar,
                phone: data[0].phone,
            }
        ]
    } catch (err) {
        console.log(err);
    }
};

export const getUserMember = async (id) => {
    try {
        const { data, error } = await supabase.from("Membre").select("*").eq("id_profile", id);
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
}

//Add profile:
export const addProfile = async (profile) => {
    try {
        const { data, error } = await supabase.from("profiles").insert([profile]);
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
}

//Update profile:
export const updateProfile = async (id, profile) => {
    try {
        const { data, error } = await supabase.from("profiles").update(profile).eq("id", id);
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
}

//Delete profile:
export const deleteProfile = async (id) => {
    try {
        const { data, error } = await supabase.from("profiles").delete().eq("id", id);
        if (error) throw error;
        return data;
    } catch (err) {
        console.log(err);
    }
}

