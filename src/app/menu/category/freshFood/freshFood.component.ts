import { Component, OnInit, OnDestroy, DoCheck } from '@angular/core';
import { AppService } from '../../../app.service';
import { Product } from '../../../model/product.model';
import { Category } from '../../../model/category.model';
import { Router } from '@angular/router';
import { Aisle } from '../../../model/Aisle.model';
import { SessionService } from '../../../sessionService';


@Component({
  selector: 'my-freshFood',
  templateUrl: `app/menu/category/freshFood/freshFood.component.html`,
  
})

export class FreshFoodComponent implements OnInit,OnDestroy,DoCheck{
    
    

    public categories :Category[];
  public products :Product[];
  public aisle:Aisle;
  public total =0;
  public pro = 0;
  public count =0;
  public cart:Product[];

  constructor(private service:AppService,private router:Router,private sessionService:SessionService){}
    ngOnInit() {
        this.getAllCategory();
        this.getAisle();
        this.getCart();
        this.getTotalPro();
        this. getTotalPrice();
        this.getCount();
    }

    ngDoCheck(){
        this.getAllCategory();
        this.getAisle();
    }
    ngOnDestroy() {
        this.sessionService.clearCategory();
        this.sessionService.clearAisle();
    }
    
    getTotal(){
        this.sessionService.getTotal();
      }
    getAllCategory() {
        this.categories=this.sessionService.getCategory();
       
      }
      getMyCart(){
        this.cart =this.sessionService.getCart();
       
      }
      getCount(){
        this.service.getMyCount().subscribe((getAll)=>{
      this.count =getAll;
      this.sessionService.setCount(this.count);
        });
      }
      getAisle(){
           this.aisle =this.sessionService.getAisle();
      }
    getAllByCat(categoryId:number){

        console.log(categoryId);
            this.service.getAllByCat(categoryId).subscribe((AllCat)=>{
        this.products =JSON.parse(AllCat['_body']);
        this.sessionService.setProductList(this.products);
        this.router.navigate(['/my-product']);
            },(error)=>{
        
            })
          }
          getCart(){
            this.service.getAllCart().subscribe((getAllCart)=>{
       this.cart =JSON.parse(getAllCart['_body']) ;
       this.sessionService.setCart(this.cart);
            },(error)=>{
       
            });
          }
          getTotalPrice(){
            this.service.getTotalPrice().subscribe((getTotal)=>{
        this.total =getTotal;
        this.sessionService.setTotal(this.total);
            },(error)=>{});
        }
        removeCart(productId:number){
            this.service.removeCart(productId).subscribe((remove)=>{
              this.count =remove;
              this.sessionService.setCount(this.count);
              this.service.getAllCart().subscribe((getAllCart)=>{
                this.cart =JSON.parse(getAllCart['_body']) ;
                this.sessionService.setCart(this.cart);
                     },(error)=>{
                
                     });
                     this.service.getTotalPrice().subscribe((getTotal)=>{
                      this.total =getTotal;
                      this.sessionService.setTotal(this.total);
                          },(error)=>{});
            },(error)=>{})
            }
            
            getTotalPro() {
              this.service.getTotalPro().subscribe((getPro) => {
                this.pro = getPro;
                this.sessionService.setPromotion(this.pro);
              }, (error) => { });
            }
 }