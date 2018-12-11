import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Aisle } from '../../model/Aisle.model';
import { SessionService } from '../../sessionService';
import { Router } from '@angular/router';


@Component({
    selector: 'my-aisle',
    templateUrl: `app/admin/aisle/aisle.component.html`,
    
  })
  
  export class AisleComponent implements OnInit{
 public aisle:Aisle;
 public message=""
 constructor(private service: AppService,private sessionService:SessionService,private router:Router) { }




AisleForm =new FormGroup({
  aisleName:new FormControl('',Validators.required),
  image:new FormControl('',Validators.required),
  banner:new FormControl('',Validators.required)
});
ngOnInit() {
    
}
saveAisle(){
 let aisle =this.AisleForm.value;
 console.log(aisle);
 this.service.addAisle(aisle).subscribe((addAisle)=>{
aisle =Aisle;
this.message =addAisle.text();
 })
}
saveCategory(){
  
  }
  logOut(){
    this.sessionService.clearUser();
    this.sessionService.clearCount();
    this.router.navigate(['/my-menu']);
  }
}