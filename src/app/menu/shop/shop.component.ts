import { Component, OnInit} from '@angular/core';

import { Router } from '@angular/router';
import { AppService } from '../../app.service';
import { SessionService } from '../../sessionService';
import { Aisle } from '../../model/Aisle.model';
import { Category } from '../../model/category.model';


@Component({
    selector: 'my-shop',
    templateUrl: `app/menu/shop/shop.component.html`,
    
  })

  export class ShopComponent implements OnInit{
 

    public aisle :Aisle[];
    public aisles:Aisle;
    public categories :Category[];
constructor(private service:AppService,private sessionService:SessionService,private router:Router){}

ngOnInit() {
 this.getAllAisle();
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

  }