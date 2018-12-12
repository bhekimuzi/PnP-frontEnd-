import { Component, OnInit} from '@angular/core';
import { Competition } from '../model/competition';
import { AppService } from '../app.service';
import { SessionService } from '../sessionService';
import { Router } from '@angular/router';
import { Order } from '../model/Order.model';


@Component({
    selector: 'my-deliveryMan',
    templateUrl: `app/deliveryMan/deliveryMan.component.html`,
    
  })

  export class DeliveryManComponent implements OnInit{
 
public order:Order[];

constructor(private service:AppService,private sessionService:SessionService,private router:Router){}

ngOnInit() {
  this.getOrder();
}


getOrder(){
    this.service.getOrder().subscribe((orders)=>{
this.order =JSON.parse(orders['_body']);
    },(erro)=>{

    });
}

logOut(){
    this.sessionService.clearUser();
    this.sessionService.clearCount();
    this.router.navigate(['/my-menu']);
  }

  }