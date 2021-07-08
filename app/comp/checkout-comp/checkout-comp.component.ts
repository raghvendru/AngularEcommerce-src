import { Component, OnInit } from '@angular/core';


import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CityServiceService } from 'src/app/service/city-service.service';
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

 

  constructor(private ordSrv:OrderServiceService,private cityListSrv:CityServiceService,private stateListSrv:StateServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router,) { 

      this.customerDetail = localStorage.getItem('loginInfo');
      this.customerDetail = JSON.parse(this.customerDetail);
      this.orderItems = this.customerDetail.cart.items;
      // console.log("I m checkout");
      // console.log(this.orderItems);
      this.address = this.customerDetail.address;
      // console.log("I m checkout");
      // // console.log(this.customerDetail.loginInfo.Name);
      // this.customerDetail.address = JSON.parse(this.customerDetail.address);
      // console.log(this.customerDetail.address.Add1);
    
  }

  ngOnInit(): void {
    this.getStateList();
    this.getCityList();
    
   


  }
  onClickPlace(){
    this.addOrder();
    console.log("checkout");
    console.log(this.customerDetail);
    this._router.navigateByUrl("/landing");

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
    let totalPrice = 0;
    for(var t of this.orderItems){
      totalPrice = totalPrice +((t.qty)*(t.price));
    }
    return totalPrice;
  }

  getStateList() {
    // console.log("hii");
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
    // console.log("hii");
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

  addOrder(){
    let paramObject : any ={};
    paramObject['customerid'] = this.customerDetail.CustomerID;
    paramObject['addressid'] = this.customerDetail.address[0].CustomerAddressID;
    paramObject['paymenttype'] = "cash on delivery";
    paramObject['paymentstatus'] = "paid";
    paramObject['totalprice'] = 6407;
    let orderitem : any =[];
    paramObject['orderitem'] = this.customerDetail.cart.items;
    
    this.ordSrv.addOrder(paramObject).subscribe(
      
      data => {
      console.log(data);
      
      },
      error1 => {
        console.log(error1);
      }
    );

  }



}
// function newEventEmitter<T>() {
//   throw new Error('Function not implemented.');
// }

