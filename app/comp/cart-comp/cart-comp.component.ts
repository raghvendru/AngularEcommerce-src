import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart-comp',
  templateUrl: './cart-comp.component.html',
  styleUrls: ['./cart-comp.component.css']
})
export class CartCompComponent implements OnInit {

  public item:any;
  public sub: Subscription = new Subscription ;
  // public selectedItem = null;

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router) { 
      this.item = this._router.getCurrentNavigation()?.extras.state;
      console.log(this.item);
    }
    
     ngOnInit(): void {
  }

}
