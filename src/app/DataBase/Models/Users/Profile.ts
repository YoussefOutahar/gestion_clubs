export class Profile {
    id: number;
    role: string;
    name: string;
    phone: string;
    avatar: string;
    email: string;
    bureau: string;
    filliere: string;
    annee: string;
    constructor(id: number, role: string, name: string, phone: string, avatar: string, email: string, bureau: string, filliere: string, annee: string) {
        this.id = id;
        this.role = role;
        this.name = name;
        this.phone = phone;
        this.avatar = avatar;
        this.email = email;
        this.bureau = bureau;
        this.filliere = filliere;
        this.annee = annee;
    }
}