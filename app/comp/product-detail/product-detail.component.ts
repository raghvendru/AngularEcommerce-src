import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public item:any;
  public sub: Subscription = new Subscription ;
  public quantity: number = 1;
  public loginInfo : any ={};
  public sessionInfo:any = {};

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private cartSrv:CartSrviceService) { 
      this.item = this._router.getCurrentNavigation()?.extras.state;
      console.log("hii");
      console.log(this.item);
    }

  ngOnInit(): void {
  this.loginInfo = localStorage.getItem('loginInfo');
  this.loginInfo = JSON.parse(this.loginInfo);
  }

  onClickaddToCart(){
    let a: number = 0;
    console.log(a);
    console.log(this.quantity);
    let param:any= {} ;
    let cartitem: any = {};
    this.loginInfo = localStorage.getItem('loginInfo');
    this.loginInfo = JSON.parse(this.loginInfo);
    cartitem['productid'] = this.item.ProductID;
    cartitem['price'] = this.item.Price;
    cartitem['qty'] = this.quantity;
    this.sessionInfo = localStorage.getItem('sessionID');
    this.sessionInfo  = JSON.parse(this.sessionInfo );
    param['sessionid'] = this.sessionInfo.sessionID ;
    param['customerid'] = this.loginInfo.CustomerID;
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

  onClickOrder(){
    if(this.loginInfo!=null){
      this._router.navigateByUrl("/checkout",{state : {price: this.item.Price}});
    } else {
      this._router.navigateByUrl("/login");
    }
  } 
}
