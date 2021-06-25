import { Component, OnInit } from '@angular/core';


import { Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-checkout-comp',
  templateUrl: './checkout-comp.component.html',
  styleUrls: ['./checkout-comp.component.css']

})
export class CheckoutCompComponent implements OnInit {
  public customerDetail : any = {};
 

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router) { 

      this.customerDetail = localStorage.getItem('loginInfo');
      this.customerDetail = JSON.parse(this.customerDetail);
      // console.log("I m checkout");
      // // console.log(this.customerDetail.loginInfo.Name);
      // this.customerDetail.address = JSON.parse(this.customerDetail.address);
      // console.log(this.customerDetail.address.Add1);
    
  }

  ngOnInit(): void {
    
   


  }
  onClickPlace(){
    this._router.navigateByUrl("/landing");

  }

}
// function newEventEmitter<T>() {
//   throw new Error('Function not implemented.');
// }

