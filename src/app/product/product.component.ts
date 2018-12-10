import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Product } from '../model/product.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';
import { getBootstrapListener } from '@angular/router/src/router_module';
import { SessionService } from '../sessionService';



@Component({
  selector: 'my-product',
  templateUrl: `app/product/product.component.html`,
  
})

export class ProductComponent implements OnInit,OnDestroy,DoCheck{
  
  
  public products:Product[];
  public qty =1;
  public newPrice=0;
  public count =0;
  public save =0;
  public originPrice=0;
  public product :Product;
  public user:User;
  public message:boolean = false;
  public cart:Product[];
  public myList:Product[];
  public total =0;
  public pro = 0;
  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
    ngOnInit() {
        this.getAllProduct();
        this.getUser();
        this.getCart();
        this.getTotalPrice();
        this.getTotal();
        this.getTotalPro();
        this.getCount();
        
      
    }
    ngDoCheck(){
     
    this.getAllProduct();
    this.getMyCount();
    }
    getMyCart(){
      this.cart =this.sessionService.getCart();
     
    }
    getMyCount(){
      this.count =this.sessionService.getCount();
    }
    getTotal(){
      this.sessionService.getTotal();
    }
getAllProduct(){
this.products =this.sessionService.getProductList();

}

getUser(){
  this.user=this.sessionService.getUser();
   }

   getCart(){
     this.service.getAllCart().subscribe((getAllCart)=>{
this.cart =JSON.parse(getAllCart['_body']) ;
this.sessionService.setCart(this.cart);
     },(error)=>{

     });
   }
ngOnDestroy(){
  this.sessionService.clearProductList();
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
getTotalPrice(){
    this.service.getTotalPrice().subscribe((getTotal)=>{
this.total =getTotal;
this.sessionService.setTotal(this.total);
    },(error)=>{});
}

getProduct(productId:number){
  console.log(productId);
  this.service.getProductById(productId).subscribe((product)=>{
this.product =product;
this.sessionService.setProduct(this.product);
this.router.navigate(['/my-pro']);
  });
  
}
addToCart(product:Product){
 
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
}
close(){
  this.message=false;
  
}
removeCart(productId:number){
this.service.removeCart(productId).subscribe((remove)=>{
  this.count =remove;
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
},(error)=>{})
}

getTotalPro() {
  this.service.getTotalPro().subscribe((getPro) => {
    this.pro = getPro;
    this.sessionService.setPromotion(this.pro);
  }, (error) => { });
}
    
 }