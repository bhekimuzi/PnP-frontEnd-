import { Product } from "./product.model";

export class Competition{

    competitionId:number;
    name:string;
    decription:string;
    endDate:string;
    photo:string;
    banner:string;
    product:Product[];
}