import { Component, OnInit, DoCheck } from '@angular/core';
import { User } from '../model/user.model';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService';
import { Product } from '../model/product.model';
import { FormGroup, FormControl, Validators, FormControlName } from '@angular/forms';
import { Order } from '../model/Order.model';



@Component({
    selector: 'my-delivery',
    templateUrl: `app/delivery/delivery.component.html`,
    
  })
  
  export class DeliveryComponent implements OnInit,DoCheck{
  
  public user:User;
  public cart: Product[];
  public qty = 1;
  public newPrice = 0;
  public count = 0;
  public originPrice = 0;
  public save = 0;
  public product: Product;
  public total = 0;
  public pro = 0;
  public delivery =90.00;
  public order:Order;

  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
    
  deliveryForm = new FormGroup({
address:new FormControl('',Validators.required),
apartment:new FormControl('',Validators.required),
addressNickName:new FormControl('',Validators.required),
date:new FormControl('',Validators.required),
mydefault:new FormControl('')
  });
    ngOnInit(){
  this.getUser();
  this.getCart();
    this.getTotalPrice();
    this.getTotal();
    this.getTotalPro();
    this.getPromotion();
    this.getMyCart();
    this.delivery;
  }
  ngDoCheck() {
    this.getMyCart();
    this.getUser();
    this.getCount();
  }
  getCount(){
    this.count =this.sessionService.getCount();
  }
  getUser(){
    this.user=this.sessionService.getUser();
     }
     getMyCart() {
      this.cart = this.sessionService.getCart();
    }

     getTotal() {
      this.total = this.sessionService.getTotal();
    }
    getPromotion() {
      this.pro = this.sessionService.getPromotion();
    }
    checkOut(){
      let checkOut = this.deliveryForm.value;
      console.log(checkOut);
      console.log(this.user.id);
     this.service.placeOrder(this.user.id,checkOut).subscribe((order)=>{
      checkOut=Order;
      this.order =order;
      this.sessionService.setOrder(this.order);
      console.log(this.user.id);
      this.router.navigate(['/my-orderSummary']);
     },(error)=>{});
 
      
      
    
    }
  
    getCart() {
      this.service.getAllCart().subscribe((getAllCart) => {
        this.cart = JSON.parse(getAllCart['_body']);
  
        this.sessionService.setCart(this.cart);
      }, (error) => {
  
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
    removeCart(productId: number) {
      this.service.removeCart(productId).subscribe((remove) => {
        this.count = remove;
        this.sessionService.setCount(this.count);
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
  
    getTotalPrice() {
      this.service.getTotalPrice().subscribe((getTotal) => {
        this.total = getTotal;
        this.sessionService.setTotal(this.total);
      }, (error) => { });
    }
  
    getTotalPro() {
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }
}