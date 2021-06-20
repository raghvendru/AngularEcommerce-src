import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public pageNum: number = 1;
  public pageSize: number = 2;
  public customerID: number = 1;
  public orderList: Array<any>=[];

  constructor(private ordSrv: OrderServiceService) { }

  ngOnInit(): void {
    this.getOrderList();
  }

  getOrderList(){
    let param:any= {} ;
    param['page_num'] = this.pageNum ;
    param['page_size'] = this.pageSize ;
    param['customerid'] = this.customerID;
    console.log("getcart");
    // this.cartSrv.getCart(param).subscribe
    this.ordSrv.getOrderList(param).subscribe(
      data => {
      console.log(data);
      this.orderList = data.data;
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  addOrder(paramObject: any){
    this.ordSrv.addOrder(paramObject).subscribe(
      
      data => {
      console.log(data);
      // deleting the item
      // this.cart.push(1);
      },
      error1 => {
        console.log(error1);
      }
    );

  }

}
