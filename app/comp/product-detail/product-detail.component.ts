import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { Subscriber, Subscription } from 'rxjs';
import { CartSrviceService } from 'src/app/service/cart-srvice.service';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public item:any;
  public sub: Subscription = new Subscription ;
  public quantity: number = 1;
  public loginInfo : any ={};

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router, private cartSrv:CartSrviceService) { 
      this.item = this._router.getCurrentNavigation()?.extras.state;
      console.log("hii");
      console.log(this.item);
    }

  ngOnInit(): void {
    // this.sub=this._Activatedroute.paramMap.subscribe(params => { 
    //    console.log(params);
    //     //  this.item = params.get('item'); 
    //       // console.log(this.item);
    // });
  //   this._Activatedroute.data.subscribe(data => {
  //     this.item=data;
  //     console.log(this.item);
  // })
  
  // this.getData(this.item);
  this.loginInfo = localStorage.getItem('loginInfo');
  }

  onClickItem(){
    let a: number = 0;
    console.log(a);
    // this.selectedItem = item;
    // this._router.navigateByUrl('/cart', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
    console.log(this.quantity);
    let param:any= {} ;
    let cartitem: any = {};
    cartitem['productid'] = this.item.ProductID;
    cartitem['price'] = this.item.Price;
    cartitem['qty'] = this.quantity;
    param['sessionid'] = "1234";
    param['customerid'] = null;
    param['cartitem'] = cartitem;
    this.addCartItem(param);
    // this._router.navigateByUrl("/productlist/:this.item.SubCategoryID");
  }
  addCartItem(paramObject: any){
    this.cartSrv.addCartItem(paramObject).subscribe(
      
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


  onClickOrder(){
    if(this.loginInfo!=null){
      this._router.navigateByUrl("/checkout");
    } else {
      this._router.navigateByUrl("/login");
    }

    
    

  } 
}
