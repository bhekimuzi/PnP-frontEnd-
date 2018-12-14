import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AppService } from '../../app.service';
import { Aisle } from '../../model/Aisle.model';
import { Product } from '../../model/product.model';
import { Recipe } from '../../model/Recipe.model';
import { ThrowStmt } from '@angular/compiler';
import { SessionService } from '../../sessionService';
import { Router } from '@angular/router';


@Component({
    selector: 'my-addRecipes',
    templateUrl: `app/admin/recipe/addRecipe.component.html`,

})

export class AddRecipeComponent implements OnInit {
    public aisle: Aisle;
    public message = "";
    public products:Array<Product>=[];
    public recipe:Recipe;
    constructor(private service: AppService,private sessionService:SessionService,private router:Router) { }


    RecipeForm = new FormGroup({
        recipeId: new FormControl('', Validators.required),
       recipeName: new FormControl('', Validators.required),
        ingredients: new FormControl('', Validators.required),
        method: new FormControl('', Validators.required),
        category: new FormControl('', Validators.required),
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
    let product= this.RecipeForm.get('product').value;
    console.log(product);
this.products.push(product);
this.RecipeForm.get('product').reset();
console.log(this.products);
    }
    saveRecipe() {
        let aisle = this.RecipeForm.value;
this.recipe =aisle;
this.recipe.product =this.products;
this.service.saveRecipe(this.recipe).subscribe((saveRec)=>{
console.log(this.recipe);
this.message =saveRec.text();
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