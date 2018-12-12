import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from '../../model/product.model';
import { AppService } from '../../app.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { SessionService } from '../../sessionService';

;


@Component({
  selector: 'my-pro',
  templateUrl: `app/product/myProduct/myProduct.component.html`,
  
})

export class MyProductComponent implements OnInit,OnDestroy{
  
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
  public total =0;
  public pro = 0;
  constructor(private service:AppService,private router: Router,private sessionService:SessionService){}
    ngOnInit() {
        this.getProduct();
        this.getCount();
        this.getUser()
    }

    getUser(){
      this.user=this.sessionService.getUser();
       }
getProduct(){
this.product =this.sessionService.getProduct();
}

ngOnDestroy(){
  this.sessionService.clearProduct();
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

addToCart(product: Product) {



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
close(){
  this.message=false;
  
}

getCount(){
  this.service.getMyCount().subscribe((getAll)=>{
this.count =getAll;
this.sessionService.setCount(this.count);
  });
}
    
 }