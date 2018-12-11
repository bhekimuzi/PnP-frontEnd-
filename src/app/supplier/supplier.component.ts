import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { Product } from '../model/product.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { User } from '../model/user.model';

import { SessionService } from '../sessionService';



@Component({
  selector: 'my-supplier',
  templateUrl: `app/supplier/supplier.component.html`,
  
})

export class SupplierComponent implements OnInit,OnDestroy,DoCheck{
  
  
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
this.service.supplier().subscribe((suppliers)=>{
this.products =JSON.parse(suppliers['_body']);
});

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

 
      product.storeQuantity++;
     

     
  
}
SubQty(product:Product){
  if(product.storeQuantity>1){
   
    product.storeQuantity--;
  

    
   
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
supply(product:Product){
 
  console.log(product);
  this.service.supply(product).subscribe((supply)=>{

  },(error)=>{

  });
  
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
logOut(){
    this.sessionService.clearUser();
    this.sessionService.clearCount();
    this.router.navigate(['/my-menu']);
  }
 }