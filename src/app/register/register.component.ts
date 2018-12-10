import { Component, OnInit } from '@angular/core';



import { AppService } from '../app.service';
import { FormControl, FormGroup, Validators, FormGroupName } from '@angular/forms';
import { User } from '../model/user.model';
import { Product } from '../model/product.model';
import { Event } from '_debugger';
import { SessionService } from '../sessionService';



@Component({
  selector: 'my-register',
  templateUrl: `app/register/register.component.html`,

})

export class RegisterComponent implements OnInit {

  constructor(private service: AppService,private sessionService:SessionService) { }
  public data: string = 'intial...';
  public myUser: string = 'intial...';
  public users: User[];
  public myValid:string;
  public user:User;
  public email:string='';
  public productList:Product[];
 public Myuser:User;
 
  registerForm = new FormGroup({
    address:new FormGroup({
      cellNumber:new FormControl('', Validators.required),
      city:new FormControl('', Validators.required),
      streetAddress:new FormControl('', Validators.required),
      suburb:new FormControl('', Validators.required),
      province:new FormControl('', Validators.required)
    }),
    id: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
    surname: new FormControl('', Validators.required),
    login:new FormGroup({
    email: new FormControl('', [Validators.required]),
    password:new FormControl('', [Validators.required,Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')]),
    role: new FormControl('', Validators.required),
  }),
    
    image: new FormControl('', Validators.required),
   
    
  });
 

  ngOnInit() {
    this.getMyData();
    this.getAllUser();
   
   this.getList();
    this.valid();
  }
  getAllUser() {
    this.service.getAllUser().subscribe((getAll) => {
      this.users =JSON.parse(getAll['_body']) ;
    });
  }
  getMyData() {
    this.service.getData().subscribe(
      (data) => {
        this.data =data.text();
      },
      (error) => {
      }
    );
  }
  createUser() {

    let user = this.registerForm.value;
    console.log(user);
    this.service.createUser(user).subscribe((create) => {
   
      user = User;
      
    }, (error) => {
     
    });
  }
  update() {
    let user = this.registerForm.value;
    let id = this.registerForm.controls['id'].value;
    this.service.update(id, user).subscribe((update) => {
      user = User;

    });
  }
  getById() {
    let id = this.registerForm.controls['id'].value;
    this.service.getUserbyId(id).subscribe((get) => {
      this.Myuser = get;
    },
      (error) => {
      });
  }
  valid(){
  this.registerForm.get('login.email').valueChanges.subscribe((email)=>{
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
  delete(){
    let id = this.registerForm.controls['id'].value;
    this.service.delete(id).subscribe((mydelete)=>{
      this.data =mydelete.text();
    });
  }
getList(){
  this.productList=this.sessionService.getProductList();
}
onFile(event:Event){
  console.log(event);
}
}

