import supabase from "./SupabaseClient";

export const addBudget = async (budget) => {
    const { data, error } = await supabase.from("budgets").insert([budget]);
    if (error) {
        console.error("Error adding budget:", error);
    } else {
        console.log("budget added successfully");
    }
};