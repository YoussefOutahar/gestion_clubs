export class Document {
    id: number;
    event_id: number;
    logo: string;
    publication: string;

    constructor(id: number, event_id: number, logo: string, publication: string) {
        this.id = id;
        this.event_id = event_id;
        this.logo = logo;
        this.publication = publication;
    }
}