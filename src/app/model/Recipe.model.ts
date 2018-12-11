import { Product } from "./product.model";

export class Recipe{

    recipeId:number;
    recipeName:string;
    ingredients:string;
    method:string;
    category:string;
    photo:string;
    banner:string;
    product:Product[];
}