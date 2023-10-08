export class Etudiant {
    id: number;
    niveau: string;
    filliere: string;

    constructor(id: number, niveau: string, filliere: string) {
        this.id = id;
        this.niveau = niveau;
        this.filliere = filliere;
    }
}