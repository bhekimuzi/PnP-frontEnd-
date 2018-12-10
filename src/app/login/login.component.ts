import { Component, OnInit,Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../app.service';
import { User } from '../model/user.model';
import { Router ,NavigationExtras} from '@angular/router'
import { Login } from '../model/Login.model';
import { SessionService } from '../sessionService';


@Component({
  selector: 'my-login',
  templateUrl: `app/login/login.component.html`,
  
})

export class LoginComponent implements OnInit {
  ngOnInit(){
    
  }  

  constructor(private service: AppService,private router: Router,private sessionService:SessionService) { }
   public user :User;
   public message:boolean = false;
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required,Validators.pattern("[^ @]*@[^ @]*")]),
    password: new FormControl('', Validators.required),
   
  });


  login(){
   let login =this.loginForm.value;
    this.service.login(login).subscribe((logins)=>{
      login =Login;
     this.user =logins;
   this.sessionService.setUser(this.user);
  
    if(this.user.login.role=="Admin"){
this.router.navigate(['/my-admin']);
    }else {
     
      this.router.navigate(['/my-logged']);
    } 
    },(error)=>{
      this.message =true;
    });
  }
 
  
}