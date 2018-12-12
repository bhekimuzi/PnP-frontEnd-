import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Aisle } from '../../model/Aisle.model';
import { Product } from '../../model/product.model';
import { Recipe } from '../../model/Recipe.model';
import { ThrowStmt } from '@angular/compiler';
import { SessionService } from '../../sessionService';
import { Router } from '@angular/router';
import { Competition } from '../../model/competition';


@Component({
    selector: 'my-addCompetion',
    templateUrl: `app/admin/competition/addCompetition.component.html`,

})

export class AddCompetitionComponent implements OnInit {
    public aisle: Aisle;
    public message = "";
    public products:Array<Product>=[];
    public competition:Competition;
    constructor(private service: AppService,private sessionService:SessionService,private router:Router) { }


    CompetionForm = new FormGroup({
       name: new FormControl('', Validators.required),
        decription: new FormControl('', Validators.required),
       endDate: new FormControl('', Validators.required),
        photo: new FormControl('', Validators.required),
        banner:new FormControl('', Validators.required),
        product:new FormGroup({
            categoryId: new FormControl('', Validators.required),
            productName: new FormControl('', Validators.required),
            originPrice:new FormControl('',Validators.required),
            save:new FormControl('',Validators.required),
            brandName:new FormControl('',Validators.required),
            image:new FormControl('',Validators.required),
            quantity:new FormControl('',Validators.required)
          })
    });
    ngOnInit() {

    }
    addProduct(){
    let product= this.CompetionForm.get('product').value;
    console.log(product);
this.products.push(product);
console.log(this.products);
    }
    saveCompetition() {
        let aisle = this.CompetionForm.value;
this.competition =aisle;
this.competition.product =this.products;
this.service.saveCompetition(this.competition).subscribe((saveRec)=>{
console.log(this.competition);
},(error)=>{});
       
    }
    saveCategory() {

    }
    logOut(){
        this.sessionService.clearUser();
        this.sessionService.clearCount();
        this.router.navigate(['/my-menu']);
      }
}