import { Component, OnInit, OnChanges, SimpleChanges, DoCheck} from '@angular/core';
import { AppService } from '../../app.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { SessionService } from '../../sessionService';
import { Aisle } from '../../model/Aisle.model';
import { Category } from '../../model/category.model';
import { FormGroup, FormControl } from '@angular/forms';
import { Product } from '../../model/product.model';




@Component({
  selector: 'my-header',
  templateUrl: `app/menu/Header/header.component.html`,
  
})

export class HeaderComponent implements OnInit,DoCheck{
  
  
 
  public count:number = 0;
  public user:User;
  public categories :Category[];
  public aisle :Aisle[];
  public aisles:Aisle;
  public products:Product[];
  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
  
  searchForm = new FormGroup({
    search:new FormControl('')
  });
  
  ngOnInit() {
   this.getCount();
   this.getUser();
   this.getAllAisle();
   this.getCount();
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

  getUser(){
    this.user=this.sessionService.getUser();
     }

  getMyCount(){
    this.count =this.sessionService.getCount();
    
  }
  ngDoCheck() {
    
    this.getMyCount();
  }

  logOut(){
    this.sessionService.clearUser();
    this.sessionService.clearCount();
    this.router.navigate(['/my-menu']);
  }
  getCount(){
    this.service.getMyCount().subscribe((getAll)=>{
  this.count =getAll;
  this.sessionService.setCount(this.count);
    });
  }

  search(){


this.service.search(this.searchForm.get('search').value).subscribe((mySearch)=>{
this.products =JSON.parse(mySearch['_body']);
this.sessionService.setProductList(this.products);
this.router.navigate(['/my-product']);
},(error)=>{});
  }
  
  getBySave(){
    this.service.getBySave().subscribe((getBySave)=>{
        this.products =JSON.parse(getBySave['_body']) ;
        this.sessionService.setProductList(this.products);
this.router.navigate(['/my-product']);
      })
}
 }