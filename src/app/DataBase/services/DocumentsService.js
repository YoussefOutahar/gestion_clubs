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

  static async addDoc(doc) {
    const { error } = await supabase.from("Documents").insert([doc]);
    if (error) {
      console.error("Error adding Document:", error);
    } else {
      console.log("Document added successfully");
    }
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

  static async dveValidation(id, validation) {
    const { data, error } = await supabase
      .from("Documents")
      .update({ dve_validation: validation })
      .eq("id", id);
    if (error) return error;
    else return data;
  };

  static async supervisorValidation(id, validation) {
    const { data, error } = await supabase
      .from("Documents")
      .update({ ref_validation: validation })
      .eq("id", id);
    if (error) return error;
    else return data;
  };

  static async deleteDoc(id) {
    const { error } = await supabase.from("Documents").delete().eq("id", id);
    if (error) return error;
    else return "Document deleted successfully";
  }

}