import { Component, OnInit } from '@angular/core';

import { Input } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-checkout-comp',
  templateUrl: './checkout-comp.component.html',
  styleUrls: ['./checkout-comp.component.css']

})
export class CheckoutCompComponent implements OnInit {
  @Input() detail: any = {}; 
 

  constructor() { }

  ngOnInit(): void {
  }

}
// function newEventEmitter<T>() {
//   throw new Error('Function not implemented.');
// }

