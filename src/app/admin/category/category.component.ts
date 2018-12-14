import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Category } from '../../model/category.model';
import { SessionService } from '../../sessionService';
import { Router } from '@angular/router';

@Component({
    selector: 'my-category',
    templateUrl: `app/admin/category/category.component.html`,
    
  })
  
  export class CategoryComponent implements OnInit{
  
  constructor(private service: AppService,private sessionService:SessionService,private router:Router) { }



public message:string ='';
CategoryForm =new FormGroup({
  aisleId:new FormControl('',Validators.required),
  categoryName:new FormControl('',Validators.required),
  image:new FormControl('',Validators.required)
});

ngOnInit() {
    
}
saveCategory(){
  let category =this.CategoryForm.value;
  let aisleId =this.CategoryForm.controls['aisleId'].value
  console.log(category);
  this.service.addCategory(aisleId,category).subscribe((MyCategory)=>{
    category = Category;
    this.message =MyCategory.text();
    this.CategoryForm.reset();
  },(error)=>{

  })
}
logOut(){
  this.sessionService.clearUser();
  this.sessionService.clearCount();
  this.router.navigate(['/my-menu']);
}
  }