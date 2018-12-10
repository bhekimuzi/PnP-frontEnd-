import { Component, OnInit } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { SessionService } from '../sessionService';
import { Product } from '../model/product.model';
import { Recipe } from '../model/Recipe.model';
import { Category } from '../model/category.model';

@Component({
    selector: 'my-recipes',
    templateUrl: `app/recipes/recipes.component.html`,

})

export class RecipesComponent implements OnInit {


    public heritage: Recipe[];
    public product: Product[];
    public recipe: Recipe[];
    public family:Recipe[];

    constructor(private service: AppService, private router: Router, private sessionService: SessionService) { }

    ngOnInit() {
        this.getByHeritage();
        this.getFamily();
    }
    getByHeritage() {

        this.service.recipeByCategory('Heritage Day').subscribe((heritages) => {
            this.heritage = JSON.parse(heritages['_body']);
            console.log(this.heritage)
        }, (error) => { });
    }

    getFamily(){
        this.service.recipeByCategory('Fresh Family').subscribe((familys) => {
            this.family = JSON.parse(familys['_body']);
            console.log(this.family)
        }, (error) => { });
    }
    getRecipe(recipeId: number) {

        this.service.getRecipe(recipeId).subscribe((recipes) => {
            this.product = JSON.parse(recipes['_body']);
            this.sessionService.setProductList(this.product);
            this.service.getSingleRecipe(recipeId).subscribe((recipes) => {
                this.recipe = recipes;

                this.sessionService.setRecipe(this.recipe);
                this.router.navigate(['/my-rec']);
            }, (error) => {

            });
        }, (error) => {

        });
    }

    

}