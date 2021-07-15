/* 
 * Fuctionality: this page shows prouct details
 * 
 * Entry Point: From product list page on clicking of a product icon
 * 
 * What data you need: detail of the product
 * 
 * How do you get data: parent is passing the data through routing param
 * 
 * Important Variable: item - 
 * 
 * Structure of data (object / json): JSON .
 * 
 * Out Navigation: On click of "ADDto cart" after adding goes back
 * 
 * 
 */
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Subscriber, Subscription } from 'rxjs';
import { Constant } from 'src/app/constant';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {



  public item:any;
  public quantity: number = 1;
  public loginInfo : any ={};
  public sessionInfo : string = "" ;
  public myCartCount: number = 1;


  constructor(private _Activatedroute:ActivatedRoute,  private sharedService: SharedServiceService,
    private _router:Router, private cartSrv:CartSrviceService, ) { 
      this.item = this._router.getCurrentNavigation()?.extras.state;
      
    }

  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(myCartCount => this.myCartCount = myCartCount)
    let str = localStorage.getItem(Constant.sessionKey);
    if (str != null) {
      this.sessionInfo = str;
    }
    str = localStorage.getItem(Constant.userKey);
    if (str != null) {
      this.loginInfo = JSON.parse(str);
    }
  }

 
  myCartCountMethod() {
    this.sharedService.myCartCountMethod(this.myCartCount+1);
  }


  onClickaddToCart(){
    this.myCartCountMethod();
    let param:any= {} ;
    let cartitem: any = {};
    cartitem['productid'] = this.item.ProductID;
    cartitem['price'] = this.item.Price;
    cartitem['qty'] = this.quantity;

    param['sessionid'] = this.sessionInfo ;
    if (this.loginInfo != null) {
      param['customerid'] = this.loginInfo.CustomerID;
    } else {
      param['customerid'] = -1;
      
    }

    param['cartitem'] = cartitem;
    this.addCartItem(param);
  }

  addCartItem(paramObject: any){
    this.cartSrv.addCartItem(paramObject).subscribe(
      data => {
        console.log(data);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}
