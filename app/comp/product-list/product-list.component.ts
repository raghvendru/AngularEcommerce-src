import { state } from '@angular/animations';
import { HttpParams } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscriber, Subscription } from 'rxjs';
import { Constant } from 'src/app/constant';
import { ProductListService } from 'src/app/service/product-list.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  // search : String = "";
  pageNum : number = 1 ;
  pageSize : number = 50;
  public search :any = "";


  public productlist:Array<any>=[];

  public id:any;
  public sub: Subscription = new Subscription ;
  public selectedItem = null;


  constructor(private productListSrv:ProductListService,private _Activatedroute:ActivatedRoute,
    private _router:Router) {
    
   }

   ngOnInit() {
    
 
    this.sub=this._Activatedroute.paramMap.subscribe(params => { 
       console.log(params);
         if (params.get('id')){
          this.id = params.get('id');
          this.getData(this.id);
         } else {
          this.search = params.get('search');
          this.getSearchPage(this.search);
          console.log(params.get('search'));

         }
         
    });
  }
  getData(catid:number) {
    let param:any= {} ;
    param['sub_cat_id'] = catid;
    param['page_num'] = Constant.page_num ;
    param['page_size'] = Constant.page_size;
    

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
    this._router.navigateByUrl('/productdetail', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
  }

  
  getSearchPage(search:string) { 
    let param:any= {} ;
    param['search'] = this.search;
    param['page_num'] = this.pageNum ;
    param['page_size'] = this.pageSize;
    // call the service method to fetch the data
    this.productListSrv.getSearchPage(param).subscribe(
      data => {
       console.log(data);
       this.productlist = data.data;
        
      },
      error1 => {
        console.log(error1);
      }
    );
  }

}