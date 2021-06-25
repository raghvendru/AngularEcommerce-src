import { isNgTemplate } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { OrderServiceService } from 'src/app/service/order-service.service';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  public pageNum: number = 1;
  public pageSize: number = 20;
  public customerID: number = 2;
  public orderList: Array<any>=[];
  public addressID:number=2;
  public paymentType:String ="cash";
  public paymentStatus:String = "paid";
  public totalPrice:number = 200;
  public orderItems:any = [];
  public productID:number=1;
  public qty:number=1;
  public price:number=100;

  constructor(private ordSrv: OrderServiceService,private _Activatedroute:ActivatedRoute,
    private _router:Router) { }

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


// http://localhost:8000/api/main/order/add?order_json=order_json = 
// {"customerid":1,
//               "addressid":2,
//              "paymenttype":"cash",
//              "paymentstatus":"paid",
//              "totalprice":200}
// 
// Query Params{"customerid":1,"addressid":2,"paymenttype":"cash","paymentstatus":"paid",
// "totalprice":200,"orderitem":[{"productid":1,"qty":2,"price":32}]}
  

 

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

  onClickReturn(index:number){
    // this._router.navigateByUrl("/return",{state:{orderid:this.productID.}});
    // this._router.navigateByUrl('/return', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });

  }

}
