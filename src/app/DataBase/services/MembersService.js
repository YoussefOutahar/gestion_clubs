import { getClub } from "./ClubsService";
import supabase from "../Clients/SupabaseClient";

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
//µµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµµ
export const addMembreTest = async (Membre) => {
    let { data: newMembre, error } = await supabase.from("Membre").insert([
        {
          role: newMembre.role,
        },
      ]);
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

export const getMembreClub = async (id_member) => {
    let {data,error} = await supabase.from("Membre").select("*").eq("id", id_member);
    if (error) console.log("error", error);
    else return await getClub(data[0].id_club);
}

export const getMembreByProfile = async (id_profile) => {
    let {data,error} = await supabase.from("Membre").select("*").eq("id_profile", id_profile);
    if (error) console.log("error", error);
    else return data;
}

export const getEtudiant = async (id_etudiant) => {
    let {data,error} = await supabase.from("Etudiants").select("*").eq("id", id_etudiant);
    if (error) console.log("error", error);
    else return data;
}
