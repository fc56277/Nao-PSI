export interface Game {
    _id: string;
    name: string;
    type: string;
    price: number;
    description: string;
    img: string;
    avgClassification: number;
    allClassifications: number[];
}