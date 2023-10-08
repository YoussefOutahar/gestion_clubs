export class Membre {
    id: number;
    id_etd: number;
    id_club: number;
    id_profile: number;
    role: string;

    constructor(id: number, id_etd: number, id_club: number, id_profile: number, role: string) {
        this.id = id;
        this.id_etd = id_etd;
        this.id_club = id_club;
        this.id_profile = id_profile;
        this.role = role;
    }
}