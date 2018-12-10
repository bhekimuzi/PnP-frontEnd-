import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Product } from '../model/product.model';
import { Category } from '../model/category.model';
import { SessionService } from '../sessionService';
import {  Router } from '@angular/router';

@Component({
    selector: 'my-admin',
    templateUrl: `app/admin/admin.component.html`,
    
  })
  
  export class AdminComponent implements OnInit{
 private message:string="";
 private product:Product;
constructor(private service:AppService,private sessionService:SessionService,private router:Router){}

ProductForm =new FormGroup({
  productId:new FormControl('',Validators.required),
  categoryId:new FormControl('',Validators.required),
  productName:new FormControl('',Validators.required),
  originPrice:new FormControl('',Validators.required),
  save:new FormControl('',),
  image:new FormControl('',Validators.required),
  quantity:new FormControl('',Validators.required),
  brandName:new FormControl('',Validators.required)
});

ngOnInit() {
    
}
saveProduct(){
  let product = this.ProductForm.value;
  let categoryId =this.ProductForm.controls['categoryId'].value;
  console.log(product);
  this.service.addProduct(categoryId,product).subscribe((MyProduct)=>{
    product =Product;
    this.message =MyProduct.text();
    this.ProductForm.reset();
  },(error)=>{
this.message =error.text();
  });
}
getById() {
  let id = this.ProductForm.controls['productId'].value;
  this.service.getProductById(id).subscribe((get) => {
    this.product = get;
  },
    (error) => {
    });
}
update() {
  let product = this.ProductForm.value;
  let id = this.ProductForm.controls['productId'].value;
  this.service.updateProduct(id, product).subscribe((update) => {
    product = Product;

  });
}
delete(){
  let id = this.ProductForm.controls['productId'].value;
  this.service.deleteProduct(id).subscribe((deletes)=>{
this.message ="Product has been removed";
  },(error)=>{

  });
}


logOut(){
  this.sessionService.clearUser();
  this.sessionService.clearCount();
  this.router.navigate(['/my-menu']);
}

  }