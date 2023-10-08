import supabase from "../Clients/SupabaseClient";

export const addBudget = async (budget) => {
    const { data, error } = await supabase.from("budget").insert([budget]);
    if (error) {
        console.error("Error adding budget:", error);
    } else {
        console.log("budget added successfully");
    }
};
export const getBudgetByClub = async (id) => {
    const { data , error } = await supabase.from("Budget").select("budget, rest").eq("id_club", id);
    if (error) {
        console.error("Error getting budget:", error);
        return { budget: 0, rest: 0 };
      } else if (data && data.length > 0) {
        return { budget: data[0].budget, rest: data[0].rest };
      } else {
        console.log("Budget not found for club", id);
        return { budget: 0, rest: 0 };
      }
};