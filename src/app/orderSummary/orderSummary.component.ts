import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService';
import { Order } from '../model/Order.model';


@Component({
    selector: 'my-orderSummary',
    templateUrl: `app/orderSummary/orderSummary.component.html`,
    
  })


  export class OrderSummaryComponent implements OnInit,DoCheck{
    
    public total = 0;
  public pro = 0;
  public delivery =90.00;
  public order:Order;

    constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
    
    
    ngDoCheck() {
       
    }
    ngOnInit() {
       this.getTotalPrice();
       this.getTotalPro(); 
       this.getOrder();
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
  }