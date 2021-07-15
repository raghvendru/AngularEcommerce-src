/* 
 * Fuctionality: this page shows the cart list items which the user had put the products in cart.
 * 
 * Entry Point: Entry is from the product detail page.
 * 
 * What data you need: the data of the products which are in the cart
 * 
 * How do you get data: we get data calling the cart service .
 * 
 * Important Variable: cartItems and Cart of an ARRAY.
 * 
 * Structure of data (object / json): JSON Array.
 * 
 * Out Navigation:It navigates to Order COnfirmation.
 * 
 * 
 */
import { HttpParams } from '@angular/common/http';
import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/constant';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-cart-comp',
  templateUrl: './cart-comp.component.html',
  styleUrls: ['./cart-comp.component.css']
})

/*
 * Declaration of variables 
 */
export class CartCompComponent implements OnInit {

  sessionInfo : string = "";
  public loginInfo : any = {};
  public cart: any = []; 
  public myCartCount : number = 0;

  /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
    constructor(private cartSrv:CartSrviceService, private _Activatedroute:ActivatedRoute,  private sharedService: SharedServiceService,
      private _router:Router){
      }
   /*
  *On initialization this function is called
  */  
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(myCartCount => this.myCartCount = myCartCount)
    this.getCart();
  }
 
  /*this function returns the list of cart items present in the local storage sessionID or customerID */

  getCart() {
    let param:any= {};
    let str  = localStorage.getItem(Constant.userKey);
    if (str != null) {
      this.loginInfo = JSON.parse(str); 
    } else {
      this.loginInfo = null ;
    }
    str = localStorage.getItem(Constant.sessionKey);
    if (str != null) {
      this.sessionInfo  = str ;
      param['sessionid'] = this.sessionInfo ;
    }
  
    if (this.loginInfo != null) {
      if (this.loginInfo.CustomerID == undefined) {
        param['customerid'] = -1;
      } else {
        param['customerid'] = this.loginInfo.CustomerID;
      }
    }
    
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

  /*this function is called for the deletion of the items in the cart */
  deleteCartItem(paramObject: any, i: number) {
    this.cartSrv.deleteCartItem(paramObject).subscribe(
      data => {
      console.log(data);
        // deleting the item
        this.cart.splice(i, 1);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
  /*call the cart service.delete method cart id and product id */
  onClickRemove(i: number) {
    this.myCartCountMethod();
    let param:any= {} ;
    param['cartid'] = this.cart[i].cartid ;
    param['productid'] = this.cart[i].productid;
    this.deleteCartItem(param, i);
  }

  onClickUpdate(i: number) {
    console.log("clicking text");
    let param:any= {} ;
    param['cartitem_id'] = this.cart[i].cartitemid ;
    param['qty'] = this.cart[i].qty;
    this.updateCartItem(param, i);
  }

  myCartCountMethod() {
    this.sharedService.myCartCountMethod(this.myCartCount -1);
  }

  
  //by calling the cart service we are updating the cartitems/
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

  /* this is function is called when user clicks on Buy Now button.
  * on clicking the button it navigates through order confirmation when user is already logged in.
  * if not logged in, it navigates to login p.
  */
  onClick(){
    if(this.loginInfo != null) {
      this._router.navigateByUrl("/checkout");
    } else {
      this._router.navigateByUrl("/login");
    }
  } 

  ocClickGoHere(){
    this._router.navigateByUrl("/landing");
  }

  
 /* this is function has the total price of the items present in the cart*/
  getTotal():number {
    var totalPrice =0.0;
    for(var t of this.cart ) {
      totalPrice = totalPrice +((t.qty)*(t.price));
    }
    return totalPrice;
  }
}