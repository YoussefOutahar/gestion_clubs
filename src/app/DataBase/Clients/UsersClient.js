import supabase from "./SupabaseClient";

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
