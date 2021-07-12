import { Component, Input, OnInit, Output } from '@angular/core';
import { Constant } from 'src/app/constant';
import { ProductListService } from 'src/app/service/product-list.service';


@Component({
  selector: 'app-similar',
  templateUrl: './similar.component.html',
  styleUrls: ['./similar.component.css']
})
export class SimilarComponent implements OnInit {
  public similarlist:any = {};
  @Input() itemInput :any = null;
  public productid = 1;
  public subcategorytid = 1;
  public pageNum : number = 1;
  public pageSize : number = 10;



  constructor(private productListSrv:ProductListService) { }

  ngOnInit(): void {
    this.getSimilarProduct();
 
    
  }

  getSimilarProduct(){
    let param:any= {} ;
    param['productid'] = this.itemInput.ProductID;
    param['subcategoryid'] = this.itemInput.SubCategoryID;
    param['page_num'] = Constant.page_num;
    param['page_size'] = Constant.page_size;
    

    // call the service method to fetch the data
    this.productListSrv.getSimilarProduct(param).subscribe(
      data => {
       console.log(data);
       this.similarlist = data.data;
        
      },
      error1 => {
        console.log(error1);
      }
    );

  }



}
