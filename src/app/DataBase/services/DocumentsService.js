import supabase from "../Clients/SupabaseClient";

export default class DocumentsService {

  static async getDocs() {
    const { data, error } = await supabase.from("Documents").select("*");
    if (error) return error;
    else return data;
};

static async getDoc(id) {
    const { data, error } = await supabase.from("Documents").select("*").eq("id", id);
    if (error) return error;
    else return data;
};

// {/*export const getDocByName = async (name) => {
//     const { data, error } = await supabase.from("Documents").select("*").eq("nom", name);
//     if (error) console.log("error", error);
//     else return data;
// };*/}

static async getDocByName(name) {
try {
    const { data, error } = await supabase.from("Documents").select("*").eq("nom", name);
    if (error) {
      console.error(error);
      return { error: "Error retrieving document" }; // Return an error object
    } else {
      return { url: data[0].path }; // Return the URL from the data
    }
  } catch (error) {
    console.error(error);
    return { error: "Error retrieving document" }; // Return an error object
  }
};

}