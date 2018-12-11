import { Component,  OnInit, DoCheck } from '@angular/core';

import { User } from '../model/user.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Aisle } from '../model/Aisle.model';
import { Category } from '../model/category.model';
import { Product } from '../model/product.model';
import { SessionService } from '../sessionService';



@Component({
  selector: 'my-logged',
  templateUrl: `app/logged/logged.component.html`,
  
})

export class LoggedComponent implements OnInit,DoCheck{
 
  public categories :Category[];
  public aisle :Aisle[];
  public aisles:Aisle;
  public count =0;
  public products:Product[];
  public qty =1;
  public newPrice=0;
  public originPrice=0;
 public message:boolean = false;
 public product :Product;
 public total =0;
  public pro = 0;
  public save =0;
  public cart:Product[];
  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
  public user:User;
  ngOnInit() {
     this.getUser();
     this.getAllAisle();
     this.getCount();
     this.getBySave();
     this.getCart();
     this.getTotalPrice();
     this.getTotalPro()
  }

  ngDoCheck() {
    this.getMyCart();
    this.getTotal();
  }
  getTotal(){
    this.total= this.sessionService.getTotal();
   }

  getBySave(){
    this.service.getBySave().subscribe((getBySave)=>{
      this.products =JSON.parse(getBySave['_body']) ;
    })
  }

  getMyCart(){
    this.cart =this.sessionService.getCart();
   
  }
 getUser(){
this.user=this.sessionService.getUser();
 }

 getAllAisle() {
  this.service.getAllAisle().subscribe((getAll) => {
    this.aisle =JSON.parse(getAll['_body']) ;
  });
}
getAllByCat(aisleId:number){

  console.log(aisleId);
  this.service.getAisleById(aisleId).subscribe((getAisle)=>{
    this.aisles =getAisle;
    this.sessionService.setAisle(this.aisles);
        });
      this.service.getAllByAisle(aisleId).subscribe((AllCat)=>{
  this.categories =JSON.parse(AllCat['_body']);
  this.sessionService.setCategoryList(this.categories);
 
  this.router.navigate(['/my-freshFood']);
      },(error)=>{
  
      });

    }
    getCount(){
      this.service.getMyCount().subscribe((getAll)=>{
    this.count =getAll;
    this.sessionService.setCount(this.count);
      });
    }
    AddQty(product:Product){

      this.newPrice =product.newPrice/product.quantity;
          this.originPrice =product.originPrice/product.quantity;
          this.save =product.save/product.quantity;
          product.quantity++;
          product.newPrice =product.newPrice+this.newPrice;
          product.originPrice =product.originPrice+this.originPrice;
          product.save =product.save+this.save;
    
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
    SubQty(product:Product){
      if(product.quantity>1){
        this.newPrice =product.newPrice/product.quantity;
        this.originPrice =product.originPrice/product.quantity;
        this.save =product.save/product.quantity;
        product.quantity--;
        product.newPrice =this.newPrice*product.quantity;
        product.originPrice=this.originPrice*product.quantity;
        product.save =this.save*product.quantity;
    
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
    addToCart(product: Product, i: any) {



      console.log(product);
      if (this.user != null) {
        if (this.cart.find((yProduct) => yProduct.productId == product.productId)) {
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
          }, (error) => { });
  
        } else {
          this.service.addToCart(product).subscribe((cart) => {
            this.count = cart;
            this.sessionService.setCount(this.count);
            this.service.getAllCart().subscribe((getAllCart) => {
              this.cart = JSON.parse(getAllCart['_body']);
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
  
          });
  
        }
      } else {
        this.message = true;
      }
    }

    close(){
      this.message=false;
      
    }
    getProduct(productId:number){
      console.log(productId);
      this.service.getProductById(productId).subscribe((product)=>{
    this.product =product;
    this.sessionService.setProduct(this.product);
    this.router.navigate(['/my-pro']);
      })
      
    }
    getCart(){
      this.service.getAllCart().subscribe((getAllCart)=>{
 this.cart =JSON.parse(getAllCart['_body']) ;
 this.sessionService.setCart(this.cart);
      },(error)=>{
 
      });
    }
    getTotalPrice(){
      this.service.getTotalPrice().subscribe((getTotal)=>{
  this.total =getTotal;
  this.sessionService.setTotal(this.total);
      },(error)=>{});
  }


removeCart(product: Product) {

    this.service.removeCart(product.productId).subscribe((remove) => {
      this.count = remove;

      if (product.quantity > 1) {
        this.newPrice = product.newPrice / product.quantity;
        this.originPrice = product.originPrice / product.quantity;
        this.save = product.save / product.quantity;
        product.quantity = 1;
        product.newPrice = this.newPrice * product.quantity;
        product.originPrice = this.originPrice * product.quantity;
        product.save = this.save * product.quantity;
        console.log(product);
        this.sessionService.setCount(this.count);
      }

      this.service.getAllCart().subscribe((getAllCart) => {
        this.cart = JSON.parse(getAllCart['_body']);
        this.sessionService.setCart(this.cart);
      }, (error) => {

      });
      this.service.getTotalPrice().subscribe((getTotal) => {
        this.total = getTotal;
        this.sessionService.setTotal(this.total);
      }, (error) => { });
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }, (error) => { })
  }


    getTotalPro() {
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }
 }