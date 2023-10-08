export class Budget {
    id: number;
    source: string;
    budget: number;
    rest: number;
    anne: string;
    id_club: number;

    constructor(id: number, source: string, budget: number, rest: number, anne: string, id_club: number) {
        this.id = id;
        this.source = source;
        this.budget = budget;
        this.rest = rest;
        this.anne = anne;
        this.id_club = id_club;
    }
}