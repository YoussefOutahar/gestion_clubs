import supabase from "../Clients/SupabaseClient";
import ClubsService from "./ClubsService";

export default class UsersService {
    static async getCurrentUser() {
        const {
            data: { session },
        } = await supabase.auth.getSession();
        const user = session?.user;
    
        return user;
    };

    static async getUsers() {
        try {
            const { data, error } = await supabase.from("profiles").select("*");
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async getUserById(id) {
        try {
            const { data, error } = await supabase.from("profiles").select("*").eq("id", id);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async getUserClub(id){
        try {
            const { data, error } = await supabase.from("Clubs").select("name").eq("id", id);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    }

    static async updateUser(id,user) {
        try {
            const { data, error } = await supabase.from("profiles").update(id).eq("id", id);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async deleteUser(id) {
        try {
            const { data, error } = await supabase.from("profiles").delete().eq("id", id);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };

    static async createUser(user) {
        try {
            const { data, error } = await supabase.from("profiles").insert([user]);
            if (error) throw error;
            return data;
        } catch (err) {
            console.log(err);
        }
    };
}
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

//Get all profiles that has role = user :
export const getAllProfilesByRole = async () => {
    try {
        const { data, error } = await supabase.from("profiles").select("*").eq("role", "user").order("id", { ascending: true });
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

export const getUsersByClub = async (id) => {
    try {
        const { data, error } = await supabase.from("profiles").select("*").eq("id_club", id);
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

export const getMembreClub = async (id_member) => {
    let {data,error} = await supabase.from("profiles").select("*").eq("id", id_member);
    if (error) console.log("error", error);
    else return await ClubsService.getClub(data[0].id_club);
}

export const updateUserRole = async (userId, newRole) => {
    try {
        const existingProfile = await getProfileById(userId);

        if (existingProfile.length > 0) {
            const updatedProfile = {
                ...existingProfile[0], // Copy the existing profile data
                role_club: newRole,    // Update the role_club
            };

            const updatedData = await updateProfile(userId, updatedProfile);

            console.log("User role updated:", updatedData);
        }
    } catch (err) {
        console.log(err);
    }
}
