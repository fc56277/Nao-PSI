import {Game} from "./game";

export interface User {
    _id: string;
    name: string;
    password: string;
    imagemPerfil: string;
    wishList: [Game];
    followers: [User];
    following: [User];
    library: [Game];
}