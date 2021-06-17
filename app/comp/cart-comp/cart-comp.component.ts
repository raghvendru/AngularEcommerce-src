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
  }
 
  
  getCart(){
    let param:any= {} ;
    param['sessionid'] = this.sessionid ;
    param['customerid'] = this.customerid;
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


}
