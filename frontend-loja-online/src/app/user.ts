import {Game} from "./game";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    imagemPerfil: string;
    wishList: [Game];
    followers: [User];
    following: [User];
}