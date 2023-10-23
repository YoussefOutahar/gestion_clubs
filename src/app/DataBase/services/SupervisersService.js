import supabase from "../Clients/SupabaseClient";

export const getSuperviser = async (id) => {
    let { data: Superviser, error } = await supabase.from("Supervisers").select("*").eq("id", id);
    if (error) console.log("error", error);
    else return Superviser;
};

export const addSuperviser = async (person) => {
    let { data: newSuperviser, error } = await supabase.from("Supervisers").insert([person]);
    if (error) console.log("error", error);
    else return newSuperviser;
};