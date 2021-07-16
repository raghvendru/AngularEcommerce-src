/*
* Fuctionality: this page shows the customer details for the confirmation of the order and gives the payment options .
* 
* Entry Point: Entry is from the cart page.
* 
* What data you need: the data of the products which are in the cart and customer details
* 
* How do you get data: we get data calling the order service and the customer service .
* 
* Important Variable: customerDetail,orderItems,totalPrice.
* 
* Structure of data (object / json): JSON Array.
* 
* Out Navigation:It navigates to ConfirmOrder.
* 
* 
*/
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Constant } from 'src/app/constant';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';
import { CityServiceService } from 'src/app/service/city-service.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { StateServiceService } from 'src/app/service/state-service.service';

@Component({
  selector: 'app-checkout-comp',
  templateUrl: './checkout-comp.component.html',
  styleUrls: ['./checkout-comp.component.css']

})

/*
 * Declaration of variables 
 */
export class CheckoutCompComponent implements OnInit {
  public customerDetail : any = {};
  public state : any = [];
  public city : any = [];
  public totalPrice :number = 0;
  public paymentType : string = "";
  public isOrder: boolean = true;

  sessionInfo : string = "";
  public loginInfo : any = {};
  public cart: Array<any> = []; 
  public myCartCount : number = 0;
 
  /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
  constructor(private ordSrv:OrderServiceService, private cartSrv:CartSrviceService, private cusSrv:CustomerServiceService,private cityListSrv:CityServiceService,private stateListSrv:StateServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router, private sharedService: SharedServiceService,) { 
      let str = localStorage.getItem(Constant.userKey);
      if ( str != null) {
        this.customerDetail = JSON.parse(str);
      } 
    }
   /*
  *On initialization this function is called
  */
  ngOnInit(): void {
    this.sharedService.sharedMessage.subscribe(myCartCount => this.myCartCount = myCartCount)
    this.getStateList();
    this.getCityList();
    this.getCart();
  }


  myCartCountMethod() {
    this.sharedService.myCartCountMethod(0);
  }
  /*this functions is called when user clicks on place order */
  onClickPlace(){
    this.addOrder();
    console.log(this.isOrder);
    if (this.isOrder == true) {
      this. myCartCountMethod();
      console.log("customer");
      this.customerAddress();
    }
    console.log("checkout");
    console.log(this.customerDetail);
    this._router.navigateByUrl("/confirmOrder");
  }

  getCart() {
    let param:any= {};
    let str  = localStorage.getItem(Constant.sessionKey);
    if (str != null) {
      this.sessionInfo  = str;
    }
    param['sessionid'] = this.sessionInfo ;
    param['customerid'] = this.customerDetail.CustomerID;
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



  /*by calling the service we fetch the state name based on stateid */
  getStateName(StateID:number):string{
    for(var s of this.state){
      if(StateID == s.stateid){
        return s.name;
      }
    }
    return "";
  }

  /*by calling the service we fetch the city name based on cityid */
  getCityName(CityID:number):string{
    for(var c of this.city){
      if(CityID == c.cityid){
        return c.name;
      }
    }
    return "";
  }

  /* this is function has the total price of the items present in the cart*/
  getTotal():number{
    this.totalPrice = 0.0;
    for(var t of this.cart){
      this.totalPrice = this.totalPrice +((t.qty)*(t.price));
    }
    return this.totalPrice;
  }

  /* by calling the service fetching the statelist */
  getStateList() {
     let param:string = "";
    // call the service method to fetch the data
    this.stateListSrv.getStateList(param).subscribe(
      data => {
       console.log(data);
       this.state = data;  
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  /* by calling the service fetching the citylist */
  getCityList() {
     let param:string = "";
    // call the service method to fetch the data
    this.cityListSrv.getCityList(param).subscribe(
      data => {
       console.log(data);
       this.city = data; 
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  /*this adds the order for the customer by calling order service  */
  addOrder() {
    let paramObject : any ={};
    paramObject['customerid'] = this.customerDetail.CustomerID;
    paramObject['addressid'] = this.customerDetail.address[0].CustomerAddressID;
    paramObject['paymenttype'] = this.paymentType;
    if (this.paymentType == "Cash on Delivery") {
      paramObject['paymentstatus'] = "Unpaid";
    } else {
      paramObject['paymentstatus'] = "paid";
    }
    paramObject['totalprice'] = this.totalPrice;
    this.totalPrice = 0;
    let items : any = [];
    for (var product of this.cart) {
      let item : any = {};
      item['productid'] = product.productid;
      item['qty'] = product.qty;
      item['price'] = product.price;
      items.push(item);
      console.log(items);
    }
    paramObject['orderitem'] = items;
    this.ordSrv.addOrder(paramObject).subscribe(
      data => {
        console.log(data);
        this.isOrder = true;
      },
      error1 => {
        console.log(error1);
        this.isOrder = false; 
      }
    );
  }

  /* to fetch the customer details using customer service*/
  customerAddress() {
   
    let paramObject : any = {};
    paramObject['customerid'] = this.customerDetail.CustomerID;
    paramObject['customeraddressid'] = this.customerDetail.address[0].CustomerAddressID;
    paramObject['add1'] = this.customerDetail.address[0].Add1;
    paramObject['add2'] = this.customerDetail.address[0].Add2 ;
    paramObject['add3'] = this.customerDetail.address[0].Add3;
    paramObject['cityid'] = this.customerDetail.address[0].CityID;
    paramObject['stateid'] = this.customerDetail.address[0].StateID;
    paramObject['pincode'] = this.customerDetail.address[0].PinCode;   
    this.cusSrv.updateCustomerAddress(paramObject).subscribe(
      data => {
        console.log(data);
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}