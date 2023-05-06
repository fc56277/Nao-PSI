import {Game} from "./game";
import { User } from "./user";

export interface Present {
    _id: string;
    game: Game;
    sender: User;
    reciever: User;
    status: Number;
}