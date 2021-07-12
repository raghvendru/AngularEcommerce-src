import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class ProductListService extends BaseService {

  private productListUrl = 'product/product-by-sub-cat';
  private searchPageUrl = 'product/product-by-search';
  private similarProductUrl = 'product/get-similar-product';

  constructor(private apiSrv:ApiService) {
    super(apiSrv);
   }
  
  /* This function gives the list of products in paginated form 
    based on the subcategory */
  getProductList(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this.productListUrl,paramsObject )
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
  }

  /* This function gives the list of product based on 
  the search key entered by the user */
  getSearchPage(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this.searchPageUrl,paramsObject )
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
  }


  /* This function give the list of similar product based on the 
   given product info (based on subcategory) */
  getSimilarProduct(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this.similarProductUrl,paramsObject )
      .pipe(
        map(response => {
          console.log(response);
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
  }

}
