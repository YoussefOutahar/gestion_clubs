import supabase from "./SupabaseClient";

export const signUp = async (email, password,role,name,phone,avatar) => {
    const { user, session, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                role: role,
                name: name,
                email: email,
                avatar: avatar,
                phone: phone,
            },
        },
    });
    return { user, session, error };
};

export const signIn = async (email, password) => {
    const { user, session, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });
    return { user, session, error };
};

export const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
};
