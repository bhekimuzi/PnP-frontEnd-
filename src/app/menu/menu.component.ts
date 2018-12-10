import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Category } from '../model/category.model';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import {Router } from '@angular/router';
import { Aisle } from '../model/Aisle.model';
import { User } from '../model/user.model';
import { SessionService } from '../sessionService';

@Component({
  selector: 'my-menu',
  templateUrl: `app/menu/menu.component.html`,
  
})

export class MenuComponent implements OnInit{
  public categories :Category[];
  public aisle :Aisle[];
  public aisles:Aisle;
  public user:User[];
  public count =0;
  public products:Product[];
  public qty =1;
  public newPrice=0;
  public originPrice=0;
 public message:boolean = false;
 public product :Product;
  

  catForm = new FormGroup({
    categoryId:new FormControl('',Validators.required)
  });
 

  ngOnInit(){
    this.getAllAisle();
    this.getCount();
    this.getBySave();
  } 
  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
  
  getAllAisle() {
    this.service.getAllAisle().subscribe((getAll) => {
      this.aisle =JSON.parse(getAll['_body']) ;
    });
  }
  getBySave(){
    this.service.getBySave().subscribe((getBySave)=>{
      this.products =JSON.parse(getBySave['_body']) ;
    })
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

        product.quantity++;
        this.newPrice =product.newPrice/this.qty;
        this.originPrice =product.originPrice/this.qty;
        this.qty =this.qty + 1;
        product.newPrice =product.newPrice+this.newPrice;
        product.originPrice =product.originPrice+this.originPrice;
        
      }
      SubQty(product:Product){
        if(product.quantity>1){
        product.quantity--;
        this.newPrice =product.newPrice/this.qty;
        this.originPrice =product.originPrice/this.qty;
        this.qty =this.qty - 1;
        product.newPrice =this.newPrice*this.qty;
        product.originPrice=this.originPrice*this.qty;
        }
      }
      addToCart(product:Product){
 
        console.log(product);
        if(this.user!=null){
      this.service.addToCart(product).subscribe((cart)=>{
      this.count =cart;
      this.sessionService.setCount(this.count);
        });
      }else{
        
       this.message =true;
         
        
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
 }