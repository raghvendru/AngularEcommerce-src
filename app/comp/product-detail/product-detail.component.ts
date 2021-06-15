import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { Subscription } from 'rxjs';
import { Subscriber, Subscription } from 'rxjs';


@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public item:any;
  public sub: Subscription = new Subscription ;
  // public selectedItem = null;

  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router) { 
      this.item = this._router.getCurrentNavigation()?.extras.state;
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
  }

  onClickItem(item: any){
    // this.selectedItem = item;
    this._router.navigateByUrl('/cart', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
  }


}
