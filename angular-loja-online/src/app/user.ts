import {Game} from "./game";

export interface User {
    _id: string;
    name: string;
    email: string;
    password: string;
    gameList: [Game];
}