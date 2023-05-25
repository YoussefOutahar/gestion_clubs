import supabase from "./SupabaseClient";

//Get Current User
export const getCurrentUser = async () => {
    const {
        data: { session },
    } = await supabase.auth.getSession()
    const user = session?.user

    return user;
}