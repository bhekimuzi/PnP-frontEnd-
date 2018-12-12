import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';








import{AppService} from './app.service';
import { AppComponent }  from './app.component';
import{MenuComponent} from './menu/menu.component';
import{LoginComponent} from './login/login.component';
import{RegisterComponent} from './register/register.component';
import{SigninComponent} from './signin/signin.component';
import{RegFormComponent} from './signin/regForm/regForm.component';
import{LoggedComponent} from './logged/logged.component';
import{AdminComponent} from './admin/admin.component';
import { CategoryComponent } from './admin/category/category.component';
import{FreshFoodComponent} from './menu/category/freshFood/freshFood.component';
import{AisleComponent} from './admin/aisle/aisle.component';
import{ProductComponent} from './product/product.component';
import { MyProductComponent } from './product/myProduct/myProduct.component';
import { HeaderComponent } from './menu/Header/header.component';
import { FooterComponent } from './menu/Footer/footer.component';
import { TrolleyComponent } from './trolley/trolley.component';
import { SessionService } from './sessionService';
import { DeliveryComponent } from './delivery/delivery.component';
import { OrderSummaryComponent } from './orderSummary/orderSummary.component';
import { PaymentComponent } from './payment/payment.component';
import { RecipesComponent } from './recipes/recipes.component';
import { MyRecipeComponent } from './recipes/myRecipe/myRecipe.component';
import { AddRecipeComponent } from './admin/recipe/addRecipe.component';
import { CompetitionComponent } from './competition/competition.component';
import { SupplierComponent } from './supplier/supplier.component';
import { AddCompetitionComponent } from './admin/competition/addCompetition.component';
import { MyCompetitionComponent } from './competition/myCompetition/myCompetition.component';
import { ShopComponent } from './menu/shop/shop.component';
import { DeliveryManComponent } from './deliveryMan/deliveryMan.component';









@NgModule({
  imports:      [ BrowserModule,HttpModule,FormsModule,ReactiveFormsModule,RouterModule.forRoot([
   
    {path: 'my-menu', component: MenuComponent },
    {path: '', pathMatch:'full',redirectTo:'my-menu'},
    {path: 'my-login', component: LoginComponent },
    {path:'my-register', component: RegisterComponent},
    {path:'my-signin', component: SigninComponent},
    {path:'my-regForm', component: RegFormComponent},
    {path:'my-logged', component: LoggedComponent},
    {path:'my-admin', component: AdminComponent},
    {path:'my-category', component: CategoryComponent},
    {path:'my-freshFood', component: FreshFoodComponent},
    {path:'my-aisle', component: AisleComponent},
    {path:'my-product', component: ProductComponent},
    {path:'my-pro', component: MyProductComponent},
    {path:'my-header', component: HeaderComponent},
    {path:'my-trolley', component: TrolleyComponent},
    {path:'my-delivery', component: DeliveryComponent},
    {path:'my-orderSummary', component: OrderSummaryComponent},
    {path:'my-payment', component: PaymentComponent},
    {path:'my-recipes', component: RecipesComponent},
    {path:'my-rec', component: MyRecipeComponent},
    {path:'my-addRecipes', component: AddRecipeComponent},
    {path:'my-competition', component: CompetitionComponent},
    {path:'my-supplier', component: SupplierComponent},
    {path:'my-addCompetion', component: AddCompetitionComponent},
    {path:'my-com', component: MyCompetitionComponent},
    {path:'my-shop', component: ShopComponent},
    {path:'my-deliveryMan', component: DeliveryManComponent}
    

  ]) ],
declarations: [ AppComponent ,FreshFoodComponent,DeliveryManComponent,ShopComponent,MyCompetitionComponent,AddCompetitionComponent,SupplierComponent,CompetitionComponent, AddRecipeComponent,MyRecipeComponent,RecipesComponent,PaymentComponent,OrderSummaryComponent,TrolleyComponent,DeliveryComponent,FooterComponent, HeaderComponent,MyProductComponent,ProductComponent,AisleComponent, MenuComponent,LoginComponent,CategoryComponent,AdminComponent,RegisterComponent,SigninComponent,RegFormComponent,LoggedComponent ],
providers:[AppService,SessionService],
  bootstrap:[ AppComponent ]
})
export class AppModule { }
