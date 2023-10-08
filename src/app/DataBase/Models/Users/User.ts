import {Membre} from './Membre';
import {Profile} from './Profile';
import {Etudiant} from './Etudiant';


export class User {
    profile: Profile;
    etudiant: Etudiant;
    membre: Membre;

    constructor(id_profile:Profile, id_etd:Etudiant, id_membre:Membre) {
        this.profile = id_profile;
        this.etudiant = id_etd;
        this.membre = id_membre;
    }
}