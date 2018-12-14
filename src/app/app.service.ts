
import { Injectable } from '@angular/core';
import { Http,Response,Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import{User} from './model/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Product } from './model/product.model';
import { Category } from './model/category.model';
import { Login } from './model/Login.model';
import {Subject} from 'rxjs/Subject';
import { Aisle } from './model/Aisle.model';
import { Order } from './model/Order.model';
import { Payment } from './model/payment.model';
import { Recipe } from './model/Recipe.model';
import { Competition } from './model/competition';

@Injectable()
export class AppService {

 public ProductList :Product[];
 public category:Category[];
 public user:User;
 public product:Product;
 public aisle :Aisle;
 public count =0;
 public cart:Product[];
 public total =0;
  constructor(private http: Http) {}


 
  baseUrl: string = 'http://localhost:8080/';
getAllUser(){
  return this.http.get(this.baseUrl+"Register");
	   
}
getBySave(){
  return this.http.get(this.baseUrl+"SortBySave");
}
getAllCategory(){
  return this.http.get(this.baseUrl+"Category");
}
getData(){
  return this.http.get(this.baseUrl+"Hello/test");
  } 

  getAllByCat(categoryId:number){
    return this.http.get(this.baseUrl+"GetAll/"+categoryId);
  }

  createUser(user:User){

    return this.http.post(this.baseUrl+"Register/",user).map(this.extractData);
  }
  addAisle(aisle:Aisle){
return this.http.post(this.baseUrl+"Aisle",aisle);
  }
  getAllAisle(){
    return this.http.get(this.baseUrl+"AllAisle/");
  }
  getAllByAisle(aisleId:number){
    return this.http.get(this.baseUrl+"GetAllAisle/"+aisleId);
  }
  getAisleById(aisleId:number){
    return this.http.get(this.baseUrl+"/GetAisleById/"+aisleId).map(this.extractData);
  }
  addProduct(categoryId:number,product:Product){
    return this.http.post(this.baseUrl+"Product/"+categoryId,product);
  }
  addCategory(aisleId:number,category:Category){
    return this.http.post(this.baseUrl+"Category/"+aisleId,category);
  }
  update(id:number,user:User){

    return this.http.put(this.baseUrl+"Register/"+id,user);
  }
  getUserbyId(id:number){
  return this.http.get(this.baseUrl +"Register/"+ id).map(this.extractData);
      }
      validate(email:string){
return this.http.get(this.baseUrl+"Valid/"+email+"/").map(this.extractData);
      }
      delete(id:number){
        return this.http.delete(this.baseUrl +"Register/"+ id);
            }
login(login:Login){

  return this.http.post(this.baseUrl+"login/",login).map(this.extractData);
}
getProductById(productId:number){
  return this.http.get(this.baseUrl+"GetProduct/"+productId).map(this.extractData);
}
deleteProduct(productId:number){
  return this.http.delete(this.baseUrl +"DeleteProduct/"+ productId).map(this.extractData);
}
updateProduct(prouductId:number, product:Product){
  return this.http.put(this.baseUrl+"UpdateProduct/"+prouductId,product);
}

addToCart(product:any){
  return this.http.post(this.baseUrl+"AddToCart/",product).map(this.extractData);
}
getAllCart(){
  return this.http.get(this.baseUrl+"GetCart");
}
getMyCount(){
  return this.http.get(this.baseUrl+"Count").map(this.extractData);

}
removeCart(productId:number){
  return this.http.get(this.baseUrl+"RemoveCart/"+productId).map(this.extractData);
}

getTotalPrice(){
  return this.http.get(this.baseUrl+"Total").map(this.extractData);
}

getTotalPro(){
  return this.http.get(this.baseUrl+"TotalPromotion").map(this.extractData);
}
updateCart(product:Product){
  return this.http.post(this.baseUrl+"addQauntity/",product).map(this.extractData);
}

placeOrder(personId:number,order:Order){
  return this.http.post(this.baseUrl+"Order/"+personId,order).map(this.extractData);
}

payment(orderId:number,payment:Payment){
  return this.http.post(this.baseUrl+"payment/"+orderId,payment);
}

recipeByCategory(category:string){
  return this.http.get(this.baseUrl+"RecipeByCategory/"+category);
}
getRecipe(recipeId:number){
  return this.http.get(this.baseUrl+"GetByRecipe/"+recipeId);
}

getSingleRecipe(recipeId:number){
  return this.http.get(this.baseUrl+"MyRecipe/"+recipeId).map(this.extractData);
}

saveRecipe(recipe:Recipe){
  return this.http.post(this.baseUrl+"Recipe/",recipe);
}

search(search:string){
  return this.http.get(this.baseUrl+"search/"+search);
}
supplier(){
  return this.http.get(this.baseUrl+"GetByStoreQuantity/");
}
myStoreQuantity(cart:Product[]){
  return this.http.put(this.baseUrl+"StoreQuantity/",cart);
}
supply(product:Product){
  return this.http.put(this.baseUrl+"Supply/",product);
}

clearCart(){
  return this.http.get(this.baseUrl+"RevomeCart").map(this.extractData);
}

saveCompetition(competition:Competition){
  return this.http.post(this.baseUrl+"Competition",competition)
}

getAllCompetition(){
  return this.http.get(this.baseUrl+"GetAllCompetition");
}

getComById(competitionId:number){
  return this.http.get(this.baseUrl+"GetById/"+competitionId).map(this.extractData);
}

getOrder(){
  return this.http.get(this.baseUrl+"GetOrder");
}

reset(user:User){
  return this.http.post(this.baseUrl+"reset",user)
}



      
      private extractData(res: Response) {
        let body = res.json();
              return body;
          }
  private handleError (error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
      }
}