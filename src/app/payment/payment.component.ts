import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService';
import { Order } from '../model/Order.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { User } from '../model/user.model';
import { Product } from '../model/product.model';


@Component({
    selector: 'my-payment',
    templateUrl: `app/payment/payment.component.html`,
    
  })


  export class PaymentComponent implements OnInit,DoCheck{
    
    public total = 0;
  public pro = 0;
  public delivery =90.00;
  public order:Order;
  public user:User;
  public cart:Product[];
  public message:boolean = false;

    constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
    
    
    paymentForm = new FormGroup({
      
      cardHolderName:new FormControl('',Validators.required),
      cardNumber:new FormControl('',Validators.required),
      cvc:new FormControl('',Validators.required),
      validDates:new FormControl('')
        });


    ngDoCheck() {
       this.getUser();
       this.getOrder();
      
    }
    ngOnInit() {
       this.getTotalPrice();
       this.getTotalPro(); 
       this.getOrder();
       this.getCart()
    }
    getUser(){
      this.user=this.sessionService.getUser();
       }
getOrder(){
  this.order =this.sessionService.getOrder();
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
      checkOut(){
        let payment =this.paymentForm.value;
        console.log(payment);
        console.log(this.user.id);
        this.service.payment(this.user.id,payment).subscribe((payments)=>{

          this.service.myStoreQuantity(this.cart).subscribe((store)=>{
console.log(store);
          },(error)=>{});
        },(error)=>{});
        this.message =true;
        this.paymentForm.reset();
      }
      getCart(){
      this.service.getAllCart().subscribe((getAllCart)=>{
        this.cart =JSON.parse(getAllCart['_body']) ;
        this.sessionService.setCart(this.cart);
             },(error)=>{
        
             });
            }
            close(){
              this.message=false;
              
            }
  }