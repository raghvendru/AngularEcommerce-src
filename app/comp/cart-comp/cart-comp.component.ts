/* 
 * Fuctionality: this page shows the cart list items which the user had put the products in cart.
 * 
 * Entry Point: Entry is from the product detail page.
 * 
 * What data you need: the data of the products which are in the cart
 * 
 * How do you get data: we get data .
 * 
 * Important Variable: 
 * 
 * Structure of data (object / json)
 * 
 * Out Navigation
 * 
 * 
 */
import { HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';

@Component({
  selector: 'app-cart-comp',
  templateUrl: './cart-comp.component.html',
  styleUrls: ['./cart-comp.component.css']
})
export class CartCompComponent implements OnInit {

  sessionInfo : any = {};
  customerid : number = 1 ;
  public selectedItem = null;
  public quantity: number = 1;
  public item: any;
  public loginInfo : any = {};
  public cartItems  : any = [];
  public totalPrice : number = 0;
 
  
  
  public cart: any = []; 

  /*
    this component get activated by clicking cart icon or checkout page
    this is a cart page it shows the products with quantity,price and total price and with an option to edit or remove.
    get the cart items products by  calling web service ngOnInit() method.
    pass the parameters customerid or sessionid.
    store the data into an variable(items) which is json array.

    in HTML for each item in items bind the data and show the data by using ngFor.
  */


    constructor(private cartSrv:CartSrviceService, private _Activatedroute:ActivatedRoute,
      private _router:Router){
        this.cartItems  = localStorage.getItem('cartInfo');
        this.cartItems  = JSON.parse(this.cartItems );
      }
    
  ngOnInit(): void {
  
    this.getCart();
    // this.cart = localStorage.getItem('cartInfo');
    // this.cart  = JSON.parse(this.cart);
  }
 
  
  getCart() {
    let param:any= {};
    this.loginInfo = localStorage.getItem('loginInfo');
    this.loginInfo = JSON.parse(this.loginInfo);
    this.sessionInfo = localStorage.getItem('sessionID');
    this.sessionInfo  = JSON.parse(this.sessionInfo );
    param['sessionid'] = this.sessionInfo.sessionID ;
    console.log(this.loginInfo);
    console.log(this.loginInfo.CustomerID );
    if (this.loginInfo.CustomerID == undefined) {
      param['customerid'] = -1;
    } else {
      param['customerid'] = this.loginInfo.CustomerID;
    }
   
    console.log("getcart");
    this.cartSrv.getCart(param).subscribe(
      data => {
      console.log(data);
      this.cart = data.items ;
      console.log(this.cart);
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  deleteCartItem(paramObject: any, i: number) {
    this.totalPrice = this.totalPrice - (this.cart[i].price);
    console.log(this.totalPrice);
    this.cartSrv.deleteCartItem(paramObject).subscribe(
      
      data => {
      console.log(data);
      console.log(this.cart[i].price);
      // deleting the item
       this.cart.splice(i, 1);
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  onClickItem(i: number) {
    let param:any= {} ;
    param['cartid'] = this.cart[i].cartid ;
    param['productid'] = this.cart[i].productid;
    this.deleteCartItem(param, i);

    /*
      call the cart service.delete method cart id and product id  
    */
  }

  onClickUpdate(i: number) {
    console.log("clicking text");
    let param:any= {} ;
    param['cartitem_id'] = this.cart[i].cartitemid ;
    param['qty'] = this.cart[i].qty;
    this.updateCartItem(param, i);
  }

  
  /*
 add to cart
  create addcart item parameters are sessionid, customerid, cartitem: productid, quantity and price
  onClick add to cart call the api service 
  onClick addtocart the carticon the number needs to be incremented  
 */
  /* deleting the item*/
 

  updateCartItem(paramObject: any, i: number){
    this.cartSrv.updateCartItem(paramObject).subscribe(
      
      data => {
      console.log(data);
      },
      error1 => {
        console.log(error1);
      }
    );

  } 
  onClick(){
    if(this.loginInfo!=null) {
   
      this._router.navigateByUrl("/checkout",{state : {totalPrice: this.totalPrice}});
    } else {
      this._router.navigateByUrl("/login");
    }

    console.log("checkout");
  } 

  getTotal():number {
    this.totalPrice = 0;
    console.log(this.cartItems);
    for(var t of this.cartItems ) {
      this.totalPrice = this.totalPrice +((t.qty)*(t.price));
    }
    console.log(this.totalPrice);
    return this.totalPrice;
  }
}
