import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { User } from '../../model/user.model';
import { Router } from '@angular/router'
import { SessionService } from '../../sessionService';


@Component({
  selector: 'my-regForm',
  templateUrl: `app/signin/regForm/regForm.component.html`,
  
})

export class RegFormComponent implements OnInit{
  
  constructor(private service: AppService,private router: Router,private sessionService:SessionService) { }
  public myMessage:string="";
  public email:string='';
  public user:User;
 
  regForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    login:new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    role:new FormControl('')
  }),
  address:new FormGroup({
    cellNumber:new FormControl(''),
    postalCode:new FormControl(''),
    streetAddress:new FormControl(''),
    city:new FormControl(''),
    suburb:new FormControl(''),
    province:new FormControl('')
  })
  });
  
  ngOnInit(): void {
    this.valid();
  }  

  createUser() {

    let user = this.regForm.value;
    console.log(user);
    this.service.createUser(user).subscribe((create) =>{
  user =User;
  this.user =create;
  this.sessionService.setUser(this.user);
  if(this.user!=null){
    this.router.navigate(['/my-logged']);
  }
  
  },(error)=>{},()=>{
    
  });

}
valid(){
  this.regForm.get('login.email').valueChanges.subscribe((email)=>{
  console.log('email: ', email);
  this.email='';
  this.service.validate(email).subscribe((valid)=>{
    this.user =valid;
    if(this.user.login.email==null){

this.email='';
    }else{
      this.email ='User Already Exist';
    }

        },(error)=>{});
  });
}  
}
