import { Component, OnInit } from '@angular/core';


import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-comp',
  templateUrl: './checkout-comp.component.html',
  styleUrls: ['./checkout-comp.component.css']

})
export class CheckoutCompComponent implements OnInit {
  public customerDetail : any = {};
 

  constructor() { 
    
  }

  ngOnInit(): void {
    
    this.customerDetail = localStorage.getItem('loginInfo');
    console.log("I m checkout");
    console.log(this.customerDetail);


  }

}
// function newEventEmitter<T>() {
//   throw new Error('Function not implemented.');
// }

