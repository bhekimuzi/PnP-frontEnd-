import { Component, OnInit} from '@angular/core';


import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { AppService } from '../../app.service';
import { SessionService } from '../../sessionService';
import { FormGroup, FormControl, Validators } from '@angular/forms';



@Component({
    selector: 'my-reset',
    templateUrl: `app/login/reset/reset.component.html`,
    
  })

  export class ResetComponent implements OnInit{
 

public user:User;
public email:string ="";
constructor(private service:AppService,private sessionService:SessionService,private router:Router){}

resetForm=new FormGroup({
email: new FormControl('', Validators.required)
});

ngOnInit() {
  this.valid();
}


valid(){
    this.resetForm.get('email').valueChanges.subscribe((email)=>{
    console.log('email: ', email);
    
    this.service.validate(email).subscribe((valid)=>{
      this.user =valid;
      if(this.user.login.email==null){
  
  this.email="User doesnt Exist";
      }else{
          this.email="Your password and email will be sent to you";
        this.service.reset(this.user).subscribe((reset)=>{

        },(error)=>{});
      }
  
          },(error)=>{});
    });
  }  

logOut(){
    this.sessionService.clearUser();
    this.sessionService.clearCount();
    this.router.navigate(['/my-menu']);
  }

  }