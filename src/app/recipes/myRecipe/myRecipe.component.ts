import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { Recipe } from '../../model/Recipe.model';
import { SessionService } from '../../sessionService';
import { AppService } from '../../app.service';
import { Product } from '../../model/product.model';
import { User } from '../../model/user.model';


@Component({
  selector: 'my-rec',
  templateUrl: `app/recipes/myRecipe/myRecipe.component.html`,

})

export class MyRecipeComponent implements OnInit {


  public heritage: Recipe[];
  public product: Product[];
  public recipe: Recipe;
  public qty = 1;
  public newPrice = 0;
  public count = 0;
  public save = 0;
  public originPrice = 0;
  public cart: Product[];
  public total = 0;
  public pro = 0;
  public user:User;
  public message:boolean = false;
  constructor(private service: AppService, private router: Router, private sessionService: SessionService) { }

  ngOnInit() {
    this.getRecipe();
    this.getUser();
    this.getCart();
    this.getCount();
  }

  getUser(){
    this.user=this.sessionService.getUser();
     }
     getMyCount(){
      this.count =this.sessionService.getCount();
    }
  
     getCart(){
       this.service.getAllCart().subscribe((getAllCart)=>{
  this.cart =JSON.parse(getAllCart['_body']) ;
  this.sessionService.setCart(this.cart);
       },(error)=>{
  
       });
     }
     getCount(){
      this.service.getMyCount().subscribe((getAll)=>{
    this.count =getAll;
    this.sessionService.setCount(this.count);
      });
    }

  getRecipe() {
    this.recipe = this.sessionService.getRecipe();
    this.product = this.recipe.product;

  }
  getProduct(productId: number) {
    console.log(productId);
    this.service.getProductById(productId).subscribe((product) => {
      this.product = product;
      this.sessionService.setProduct(this.product);
      this.router.navigate(['/my-pro']);
    });

  }

  AddQty(product: Product) {

    this.newPrice = product.newPrice / product.quantity;
    this.originPrice = product.originPrice / product.quantity;
    this.save = product.save / product.quantity;
    product.quantity++;
    product.newPrice = product.newPrice + this.newPrice;
    product.originPrice = product.originPrice + this.originPrice;
    product.save = product.save + this.save;

    this.service.updateCart(product).subscribe((update) => {
      this.cart = update;
      this.sessionService.setCart(this.cart);
      this.service.getTotalPrice().subscribe((getTotal) => {
        this.total = getTotal;
        this.sessionService.setTotal(this.total);
      }, (error) => { });
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }, (error) => {

    });

  }
  SubQty(product: Product) {
    if (product.quantity > 1) {
      this.newPrice = product.newPrice / product.quantity;
      this.originPrice = product.originPrice / product.quantity;
      this.save = product.save / product.quantity;
      product.quantity--;
      product.newPrice = this.newPrice * product.quantity;
      product.originPrice = this.originPrice * product.quantity;
      product.save = this.save * product.quantity;

      this.service.updateCart(product).subscribe((update) => {
        this.cart = update;
        this.sessionService.setCart(this.cart);
        this.service.getTotalPrice().subscribe((getTotal) => {
          this.total = getTotal;
          this.sessionService.setTotal(this.total);
        }, (error) => { });
        this.service.getTotalPro().subscribe((getPro) => {
          this.pro = getPro;
          this.sessionService.setPromotion(this.pro);
        }, (error) => { });
      }, (error) => {

      });
    }

  }

  setDisabled(i:any){
    return i==0;
  }

  addToCart(product:Product,i:any){
    
   
   
    console.log(product);
    if(this.user!=null){
  this.service.addToCart(product).subscribe((cart)=>{
  this.count =cart;
  this.sessionService.setCount(this.count);
  this.service.getAllCart().subscribe((getAllCart)=>{
    this.cart =JSON.parse(getAllCart['_body']) ;
    this.sessionService.setCart(this.cart);
    
         },(error)=>{
    
         });
         this.service.getTotalPrice().subscribe((getTotal)=>{
          this.total =getTotal;
          this.sessionService.setTotal(this.total);
              },(error)=>{});
    });
   
  }else{
    this.message =true;
    
  }
  return i==0;
  }
  close(){
    this.message=false;
    
  }

}