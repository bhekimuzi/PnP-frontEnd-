import { Component, OnInit, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { Competition } from '../../model/competition';
import { AppService } from '../../app.service';
import { SessionService } from '../../sessionService';
import { Product } from '../../model/product.model';
import { ThrowStmt } from '@angular/compiler';
import { User } from '../../model/user.model';


@Component({
    selector: 'my-com',
    templateUrl: `app/competition/myCompetition/myCompetition.component.html`,

})

export class MyCompetitionComponent implements OnInit,DoCheck {
   


    public com: Competition;
    public products: Product[];
    public qty = 1;
    public newPrice = 0;
    public count = 0;
    public save = 0;
    public originPrice = 0;
    public cart: Product[];
    public total = 0;
    public pro = 0;
    public user: User;
    public message: boolean = false;
    public product: Product;

    constructor(private service: AppService, private sessionService: SessionService, private router: Router) { }

    ngOnInit() {
        this.getCompetition();
        this.getUser();
        this. getCart();

    }
    ngDoCheck() {
        this.getMyCart();
    }

    getUser() {
        this.user = this.sessionService.getUser();
    }
    getMyCart() {
        this.cart = this.sessionService.getCart();
    
      }
      getCart() {
        this.service.getAllCart().subscribe((getAllCart) => {
          this.cart = JSON.parse(getAllCart['_body']);
          this.sessionService.setCart(this.cart);
        }, (error) => {
    
        });
      }

    getCompetition() {
        this.com = this.sessionService.getCompetition();
        this.products = this.com.product;
        console.log(this.products)
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
    getTotalPrice() {
        this.service.getTotalPrice().subscribe((getTotal) => {
            this.total = getTotal;
            this.sessionService.setTotal(this.total);
        }, (error) => { });
    }

    addToCart(product: Product) {

        console.log(product);
        if (this.user != null) {
            if (this.cart.find((yProduct) => yProduct.productId == product.productId)) {
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
                }, (error) => { });

            } else {
                this.service.addToCart(product).subscribe((cart) => {
                    this.count = cart;
                    this.sessionService.setCount(this.count);
                    this.service.getAllCart().subscribe((getAllCart) => {
                        this.cart = JSON.parse(getAllCart['_body']);
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

                });

            }
        } else {
            this.message = true;
        }
    }
    getProduct(productId: number) {
        console.log(productId);
        this.service.getProductById(productId).subscribe((product) => {
            this.product = product;
            this.sessionService.setProduct(this.product);
            this.router.navigate(['/my-pro']);
        });

    }
    removeCart(product: Product) {

        this.service.removeCart(product.productId).subscribe((remove) => {
            this.count = remove;

            if (product.quantity > 1) {
                this.newPrice = product.newPrice / product.quantity;
                this.originPrice = product.originPrice / product.quantity;
                this.save = product.save / product.quantity;
                product.quantity = 1;
                product.newPrice = this.newPrice * product.quantity;
                product.originPrice = this.originPrice * product.quantity;
                product.save = this.save * product.quantity;
                console.log(product);
                this.sessionService.setCount(this.count);
            }

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

    getTotalPro() {
        this.service.getTotalPro().subscribe((getPro) => {
            this.pro = getPro;
            this.sessionService.setPromotion(this.pro);
        }, (error) => { });
    }
    close() {
        this.message = false;

    }

    getCount() {
        this.service.getMyCount().subscribe((getAll) => {
            this.count = getAll;
            this.sessionService.setCount(this.count);
        });
    }


}