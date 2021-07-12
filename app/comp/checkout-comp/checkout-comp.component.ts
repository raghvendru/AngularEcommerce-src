/*
 * Main entry point of the appliction 
 * 
 * Fuctionality: It is parent for all the components.
 * 
 * Entry Point: This is the first entry point.
 * 
 * What data you need: Categories and sub-categories
 * 
 * How do you get data: calling api service
 * 
 * Important Variable: menu of type JSON array
 * 
 * Structure of data (object / json):JSON Array
 * 
 * Out Navigation: navigates to the sub-category list depending on the category
 * 
 * 
 */
import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityServiceService } from 'src/app/service/city-service.service';
import { CustomerServiceService } from 'src/app/service/customer-service.service';
import { OrderServiceService } from 'src/app/service/order-service.service';
import { StateServiceService } from 'src/app/service/state-service.service';

@Component({
  selector: 'app-checkout-comp',
  templateUrl: './checkout-comp.component.html',
  styleUrls: ['./checkout-comp.component.css']

})
export class CheckoutCompComponent implements OnInit {
  public customerDetail : any = {};
  public address : any = [];
  public state : any = [];
  public orderItems : any = [];
  public city : any = [];
  public totalPrice :number = 0;
  public paymentType : string = "";
  public isOrder: boolean = true;
 

  constructor(private ordSrv:OrderServiceService, private cusSrv:CustomerServiceService,private cityListSrv:CityServiceService,private stateListSrv:StateServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router,) { 

      this.customerDetail = localStorage.getItem('loginInfo');
      this.customerDetail = JSON.parse(this.customerDetail);
      this.orderItems = localStorage.getItem('cartInfo');
      this.orderItems = JSON.parse(this.orderItems);
      this.address = this.customerDetail.address;
     }

  ngOnInit(): void {
    this.getStateList();
    this.getCityList();
  }

  onClickPlace(){
    this.addOrder();
    console.log(this.isOrder);
    if (this.isOrder == true) {
      console.log("customer");
      this.customerAddress();

    }
    console.log("checkout");
    console.log(this.customerDetail);
    this._router.navigateByUrl("/confirmOrder");

  }

  getStateName(StateID:number):string{
    for(var s of this.state){
      if(StateID == s.stateid){
        return s.name;
      }
    }
    return "";
  }

  getCityName(CityID:number):string{
    for(var c of this.city){
      if(CityID == c.cityid){
        return c.name;
      }
    }
    return "";
  }

  getTotal():number{
    this.totalPrice = 0;
    console.log("before multiply");
    console.log(this.totalPrice);
    for(var t of this.orderItems){
      this.totalPrice = this.totalPrice +((t.qty)*(t.price));
    }
    console.log(this.totalPrice);
    return this.totalPrice;
  }

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
    let orderitem : any =[];
    paramObject['orderitem'] = this.customerDetail.cart.items;
    
    this.ordSrv.addOrder(paramObject).subscribe(
      data => {
        console.log(data);
        this.isOrder = true;
        localStorage.removeItem
      },
      error1 => {
        console.log(error1);
        this.isOrder = false; 
      }
    );

  }

  customerAddress() {
   
    let paramObject : any ={};
    console.log(this.customerDetail.CustomerID);
    paramObject['customerid'] = this.customerDetail.CustomerID;
    paramObject['customeraddressid'] = this.customerDetail.address[0].CustomerAddressID;
    paramObject['paymenttype'] = this.paymentType;
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

