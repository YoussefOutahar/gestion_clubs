export class Club {
    id: number;
    nom: string;
    date_creation: Date;
    nb_members: number;
    id_category: number;
    description: string;
    logo: string;

    constructor(id: number, nom: string, date_creation: Date, nb_members: number, id_category: number, description: string, logo: string) {
        this.id = id;
        this.nom = nom;
        this.date_creation = date_creation;
        this.nb_members = nb_members;
        this.id_category = id_category;
        this.description = description;
        this.logo = logo;
    }
}