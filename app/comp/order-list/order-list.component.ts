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
export class OrderListComponent implements OnInit {
  public pageNum: number = 1;
  public pageSize: number = 10;
  public orderList: Array<any> = [];
  public customerDetail : any = {};
 

  constructor(private ordSrv: OrderServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router) {
    
     }

  ngOnInit(): void {
    this.getOrderList();
  }

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
