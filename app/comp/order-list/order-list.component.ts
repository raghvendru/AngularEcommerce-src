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

//   order_json = {"customerid":1,
//               "addressid":2,
//              "paymenttype":"cash",
//              "paymentstatus":"paid",
//              "totalprice":200}
// {"customerid":1,"addressid":2,"paymenttype":"cash","paymentstatus":"paid",
// "totalprice":200,"orderitem":[{"productid":1,"qty":2,"price":32}]}

// http://localhost:8000/api/main/order/add?order_json=order_json = 
// {"customerid":1,
//               "addressid":2,
//              "paymenttype":"cash",
//              "paymentstatus":"paid",
//              "totalprice":200}
// 
// Query Params{"customerid":1,"addressid":2,"paymenttype":"cash","paymentstatus":"paid",
// "totalprice":200,"orderitem":[{"productid":1,"qty":2,"price":32}]}
  

  addOrder(paramObject: any){
    this.ordSrv.addOrder(paramObject).subscribe(
      
      data => {
      console.log(data);
      
      },
      error1 => {
        console.log(error1);
      }
    );

  }

  updateOrder(paramObject: any, i: number){
    this.ordSrv.updateOrder(paramObject).subscribe(
      
      data => {
      console.log(data);
      // this.cart[i].qty
      // updating the item

      },
      error1 => {
        console.log(error1);
      }
    );

  }

}
