import { state } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { ProductListService } from 'src/app/service/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  search : String = "";
  pageNum : number = 1 ;
  pageSize : number = 10;
  public searchKey :String = "";

  public productlist:Array<any>=[];

  public id:any;
  public sub: Subscription = new Subscription ;
  public selectedItem = null;


  constructor(private productListSrv:ProductListService,private _Activatedroute:ActivatedRoute,
    private _router:Router) {
    
   }

   ngOnInit() {
 
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
      //  console.log(params);
         this.id = params.get('id'); 
          console.log(this.id);
    });
    this.getData(this.id);
  }

  // getProductList(paramsObject:any){
  //   this.productListSrv.getProductList(paramsObject).subscribe(
  //     data => {
  //     console.log(data);
  //     this.productlist =data ;
  //     this.getProductList(HttpParams);
  //     console.log(this.getProductList);
  //     },
  //     error1 => {
  //       console.log(error1);
  //     }
  //   );
  // }

  getData(catid:number) {
    // console.log("hii");
    let param:any= {} ;
    param['sub_cat_id'] = catid;
    param['pageNum'] = this.pageNum ;
    param['pageSize'] = this.pageSize;
    

    // call the service method to fetch the data
    this.productListSrv.getProductList(param).subscribe(
      data => {
       console.log(data);
       this.productlist = data.data;
        
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  onClickItem(item: any){
    this.selectedItem = item;
    console.log(this.selectedItem);
    // this._router.navigate(['productdetail', this.selectedItem]);
    // this._router.navigate(['productdetail', [item] = item]);
    // this._router.navigateByUrl('/productdetail', state :{ ProductID: item.ProductID});
    this._router.navigateByUrl('/productdetail', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
  }

  
  getSearchPage() {
    // console.log("hii");
    
    let param:any= {} ;
    param['search'] = this.searchKey;
    param['pageNum'] = this.pageNum ;
    param['pageSize'] = this.pageSize;
    
    // call the service method to fetch the data
    this.productListSrv.getSearchPage(param).subscribe(
      data => {
       console.log(data);
       this.productlist = data;
        
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}