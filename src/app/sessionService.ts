
import { Injectable } from '@angular/core';
import { Http} from '@angular/http';

import{User} from './model/user.model';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Product } from './model/product.model';
import { Category } from './model/category.model';

import { Aisle } from './model/Aisle.model';
import { Order } from './model/Order.model';
import { Recipe } from './model/Recipe.model';
import { Competition } from './model/competition';

@Injectable()
export class SessionService {

 public ProductList :Product[];
 public category:Category[];
 public user:User;
 public product:Product;
 public aisle :Aisle;
 public count =0;
 public cart:Product[];
 public total =0;
 public pro = 0;
 public order:Order;
 public recipe:Recipe;
 public competition:Competition;
  
 setCompetition(data:any){
  this.competition=data;
  sessionStorage.setItem("competition",JSON.stringify(this.competition))
}

getCompetition(){
  return JSON.parse(sessionStorage.getItem("competition"));
}

setRecipe(data:any){
  this.recipe=data;
  sessionStorage.setItem("recipe",JSON.stringify(this.recipe))
}

getRecipe(){
  return JSON.parse(sessionStorage.getItem("recipe"));
}

setOrder(data:any){
  this.order =data;
  sessionStorage.setItem("order",JSON.stringify(this.order));
}
getOrder(){
  return JSON.parse(sessionStorage.getItem("order"));
}

setCart(data:any){
  this.cart=data;
  sessionStorage.setItem("cart",JSON.stringify(this.cart));
  }
  getCart(){
    return JSON.parse(sessionStorage.getItem("cart"));
  }

setUser(data:any){
  this.user=data;
  sessionStorage.setItem("user",JSON.stringify(this.user));
}

getUser(){
  return JSON.parse(sessionStorage.getItem("user"));
}
clearUser(){
  sessionStorage.removeItem("user");
}
setTotal(data:any){
this.total =data;
sessionStorage.setItem("total",JSON.stringify(this.total));
}
getTotal(){
  return JSON.parse(sessionStorage.getItem("total"));
}
setAisle(data:any){
  this.aisle =data;
  sessionStorage.setItem("aisle",JSON.stringify(this.aisle));
}
getAisle(){
  return JSON.parse(sessionStorage.getItem("aisle"));
}
clearAisle(){
  sessionStorage.removeItem(JSON.stringify(this.aisle));
}

setCategoryList(data:any){
  this.category =data;
  sessionStorage.setItem("category",JSON.stringify(this.category));
}
getCategory(){
  return JSON.parse(sessionStorage.getItem("category"));
}
clearCategory(){
  sessionStorage.removeItem(JSON.stringify(this.category));
}

setCount(data:any){
this.count =data;
sessionStorage.setItem("count",JSON.stringify(this.count));
}
getCount(){
  return JSON.parse(sessionStorage.getItem("count"));
}
clearCount(){
  sessionStorage.removeItem("count");
}
setProduct(data:any){
this.product =data;
sessionStorage.setItem("product",JSON.stringify(this.product));
}
getProduct(){
  return JSON.parse(sessionStorage.getItem("product"));
}

clearProduct(){
  sessionStorage.removeItem(JSON.stringify(this.product));
}
  setProductList(data:any){
    this.ProductList=data;
    sessionStorage.setItem("productList",JSON.stringify(this.ProductList));
  
  }
  getProductList(){
    return JSON.parse(sessionStorage.getItem("productList"));
  }
  clearProductList() {
    sessionStorage.removeItem(JSON.stringify(this.ProductList));
  }
 
  setPromotion(data:any){
      this.pro =data;
    sessionStorage.setItem("promotion",JSON.stringify(this.pro));
  }
getPromotion(){
    return JSON.parse(sessionStorage.getItem("promotion"));
}


      
      
}