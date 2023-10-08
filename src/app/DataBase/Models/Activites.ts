export class Activites {
    id: number;
    name: string;
    date: Date;
    lieu: string;
    cost: number;
    img: string;
    Earnings: number;
    Supp_budget: number;
    url: string;
    id_club: number;
    description: string;
    location: string;
    file_name: string;

    constructor(id: number, name: string, date: Date, lieu: string, cost: number, img: string, Earnings: number, Supp_budget: number, url: string, id_club: number, description: string, location: string, file_name: string) {
        this.id = id;
        this.name = name;
        this.date = date;
        this.lieu = lieu;
        this.cost = cost;
        this.img = img;
        this.Earnings = Earnings;
        this.Supp_budget = Supp_budget;
        this.url = url;
        this.id_club = id_club;
        this.description = description;
        this.location = location;
        this.file_name = file_name;
    }
}