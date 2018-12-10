import { Component, OnInit, DoCheck } from '@angular/core';
import { AppService } from '../app.service';
import { Router } from '@angular/router';
import { Product } from '../model/product.model';
import { SessionService } from '../sessionService';




@Component({
  selector: 'my-trolley',
  templateUrl: `app/trolley/trolley.component.html`,

})

export class TrolleyComponent implements OnInit {
  

  public cart: Product[];
  public qty = 1;
  public newPrice = 0;
  public count = 0;
  public originPrice = 0;
  public save = 0;
  public product: Product;
  public total = 0;
  public pro = 0;
  constructor(private service: AppService, private router: Router, private sessionService: SessionService) { }
  ngOnInit() {
    this.getCart();
    this.getTotalPrice();
    this.getTotal();
    this.getTotalPro();
    this.getPromotion();
    this.getCount();
  }
  
  getMyCount(){
    this.count =this.sessionService.getCount();
  }

  getMyCart() {
    this.cart = this.sessionService.getCart();
  }
  getTotal() {
    this.total = this.sessionService.getTotal();
  }
  getPromotion() {
    this.pro = this.sessionService.getPromotion();
  }
  getCount(){
    this.service.getMyCount().subscribe((getAll)=>{
  this.count =getAll;
  this.sessionService.setCount(this.count);
    });
  }
  getCart() {
    this.service.getAllCart().subscribe((getAllCart) => {
      this.cart = JSON.parse(getAllCart['_body']);

      this.sessionService.setCart(this.cart);
    }, (error) => {

    });
  }

  AddQty(product: Product) {



    this.newPrice = product.newPrice / product.quantity;
    this.originPrice = product.originPrice / product.quantity;
    this.save = product.save / product.quantity;
    product.quantity++;
    product.newPrice = product.newPrice + this.newPrice;
    product.originPrice = product.originPrice + this.originPrice;
    product.save = product.save + this.save;

    this.service.updateCart(product).subscribe((update) => {
      this.cart = update;
      this.sessionService.setCart(this.cart);
      this.service.getTotalPrice().subscribe((getTotal) => {
        this.total = getTotal;
        this.sessionService.setTotal(this.total);
      }, (error) => { });
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }, (error) => {

    });



  }
  SubQty(product: Product) {
    if (product.quantity > 1) {

      this.newPrice = product.newPrice / product.quantity;
      this.originPrice = product.originPrice / product.quantity;
      this.save = product.save / product.quantity;
      product.quantity--;
      product.newPrice = this.newPrice * product.quantity;
      product.originPrice = this.originPrice * product.quantity;
      product.save = this.save * product.quantity;

      this.service.updateCart(product).subscribe((update) => {
        this.cart = update;
        this.sessionService.setCart(this.cart);
        this.service.getTotalPrice().subscribe((getTotal) => {
          this.total = getTotal;
          this.sessionService.setTotal(this.total);
        }, (error) => { });
        this.service.getTotalPro().subscribe((getPro) => {
          this.pro = getPro;
          this.sessionService.setPromotion(this.pro);
        }, (error) => { });
      }, (error) => {

      });

    }
  }
  removeCart(productId: number) {
    this.service.removeCart(productId).subscribe((remove) => {
      this.count = remove;
      this.sessionService.setCount(this.count);
      this.service.getAllCart().subscribe((getAllCart) => {
        this.cart = JSON.parse(getAllCart['_body']);
        this.sessionService.setCart(this.cart);
      }, (error) => {

      });
      this.service.getTotalPrice().subscribe((getTotal) => {
        this.total = getTotal;
        this.sessionService.setTotal(this.total);
      }, (error) => { });
      this.service.getTotalPro().subscribe((getPro) => {
        this.pro = getPro;
        this.sessionService.setPromotion(this.pro);
      }, (error) => { });
    }, (error) => { })
  }

  getTotalPrice() {
    this.service.getTotalPrice().subscribe((getTotal) => {
      this.total = getTotal;
      this.sessionService.setTotal(this.total);
    }, (error) => { });
  }

  getTotalPro() {
    this.service.getTotalPro().subscribe((getPro) => {
      this.pro = getPro;
      this.sessionService.setPromotion(this.pro);
    }, (error) => { });
  }

}