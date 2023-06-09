import supabase from "./SupabaseClient";

export const getMembres = async () => {
    let { data: Membres, error } = await supabase.from("Membre").select("*");
    if (error) console.log("error", error);
    else return Membres;
};

export const getMembre = async (id) => {
    let { data: Membre, error } = await supabase.from("Membre").select("*").eq("id_etd", id);
    if (error) console.log("error", error);
    else return Membre;
};

export const addMembre = async (Membre) => {
    let { data: newMembre, error } = await supabase.from("Membre").insert([Membre]);
    if (error) console.log("error", error);
    else return newMembre;
};

export const updateMembre = async (id, Membre) => {
    let { data: updatedMembre, error } = await supabase.from("Membre").update(Membre).eq("id_etd", id);
    if (error) console.log("error", error);
    else return updatedMembre;
}

export const deleteMembre = async (id) => {
    let { data: deletedMembre, error } = await supabase.from("Membre").delete().eq("id_etd", id);
    if (error) console.log("error", error);
    else return deletedMembre;
}

export const getMembresByClub = async (id_club) => {
    let { data: Membres, error } = await supabase.from("Membre").select("*").eq("id_club", id_club);
    if (error) console.log("error", error);
    else return Membres;
}

export const getEtudiantByMembre = async (id_etudiant) => {
    let { data: Etudiant, error } = await supabase.from("Etudiants").select("*").eq("id", id_etudiant).limit(1);
    if (error) console.log("error", error);
    else return Etudiant;
}

export const getMembresByEtudiant = async (id_etudiant) => {
    let { data: Membres, error } = await supabase.from("Membre").select("*").eq("id_etd", id_etudiant);
    if (error) console.log("error", error);
    else return Membres;
}
