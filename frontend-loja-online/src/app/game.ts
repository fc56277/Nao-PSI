export interface Game {
    _id: string;
    name: string;
    type: string;
    gameType: string;
    plataform: string;
    languages: string[];
    price: number;
    description: string;
    img: string;
    avgClassification: number;
    allClassifications: number[];
}