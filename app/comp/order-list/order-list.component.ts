/* 
 * Fuctionality: this page contains the order items which the customer has odered.
 * 
 * Entry Point: .
 * 
 * What data you need: the data of products.
 * 
 * How do you get data: we get data calling the customer service .
 * 
 * Important Variable: orderList.
 * 
 * Structure of data (object / json): JSON Array.
 * 
 * Out Navigation:It navigates .
 * 
 * 
 */
import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Constant } from 'src/app/constant';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})

/*
 * Declaration of variables 
 */
export class OrderListComponent implements OnInit {
  
  public orderList: Array<any> = [];
  public customerDetail : any = {};
 
   /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
  constructor(private ordSrv: OrderServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router) {
    }

  /*
  *On initialization this function is called
  */
  ngOnInit(): void {
    this.getOrderList();
  }

  /*  */
  getOrderList(){
    let paramObject :any= {} ;
    this.customerDetail = localStorage.getItem('loginInfo');
    this.customerDetail = JSON.parse(this.customerDetail);
    paramObject['customerid'] = this.customerDetail.CustomerID;
    paramObject['page_num'] = Constant.page_num;
    paramObject['page_size'] = Constant.page_size;
    this.ordSrv.getOrderList( paramObject).subscribe(
      data => {
      console.log(data);
      this.orderList = data.data;
      console.log(this.orderList );
      },
      error1 => {
        console.log(error1);
      }
    );

  }
}
