import {Game} from "./game";
import { Present } from "./present";

export interface User {
    _id: string;
    name: string;
    password: string;
    imagemPerfil: string;
    wishList: [Game];
    followers: [User];
    following: [User];
    library: [Game];
    recievedGames:[Present];
    sentGames:[Present];
    shoppingCartSize: Number;
}