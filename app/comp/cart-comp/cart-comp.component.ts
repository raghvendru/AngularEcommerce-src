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

  sessionid : String = "1234" ;
  customerid : number = 1 ;
  public selectedItem = null;
  public quantity: any;
  public item: any;
  public loginInfo : any = {};
  
  public cart:Array<any>=[];

  // public items:any;
  // public sub: Subscription = new Subscription ;
  // public selectedItem = null;

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
        
      }
    
  ngOnInit(): void {
    this.getCart();
    this.loginInfo = localStorage.getItem('loginInfo');
  
  }
 
  
  getCart(){
    let param:any= {} ;
    param['sessionid'] = this.sessionid ;
    param['customerid'] = this.customerid;
    console.log("getcart");
    // this.cartSrv.getCart(param).subscribe
    this.cartSrv.getCart(param).subscribe(
      data => {
      console.log(data);
      this.cart =data.items ;
      console.log(this.cart);
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  deleteCartItem(paramObject: any, i: number){
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

  onClickItem(i: number){
    // this.selectedIte = c;
    let param:any= {} ;
    param['cartid'] = this.cart[i].cartid ;
    param['productid'] = this.cart[i].productid;
    this.deleteCartItem(param, i);

    /*
      call the cart service.delete method cart id and product id  
    */
    // this._router.navigateByUrl('/productdetail', { state: { ProductID:item.ProductID } });
  }

  clickingText(i: number){
    // this.selectedIte = c;
    console.log("clicking text");
    let param:any= {} ;
    param['cartitem_id'] = this.cart[i].cartitemid ;
    param['qty'] = this.quantity;
    this.updateCartItem(param, i);
  }

  
  /*
 add to cart
 create addcart item parameters are sessionid, customerid, cartitem: productid, quantity and price
 onClick add to cart call the api service 
  onClick addtocart the carticon the number needs to be incremented  

 */

  addCartItem(paramObject: any){
    this.cartSrv.addCartItem(paramObject).subscribe(
      
      data => {
      console.log(data);
      // deleting the item
      // this.cart.push(1);
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  updateCartItem(paramObject: any, i: number){
    this.cartSrv.updateCartItem(paramObject).subscribe(
      
      data => {
      console.log(data);
      // this.cart[i].qty
      // updating the item

      },
      error1 => {
        console.log(error1);
      }
    );

  } 
  onClick(){
    if(this.loginInfo!=null){
      this._router.navigateByUrl("/checkout");
    } else {
      this._router.navigateByUrl("/login");
    }

    console.log("checkout");
    

  } 
}
