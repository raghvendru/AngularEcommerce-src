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

  constructor(private apiSrv:ApiService) {
    super(apiSrv);
   }

  //  private buildHttpParams(params: any) : Object {
  //   let httpParam = new HttpParams() ;
  //   for (const key in params) {
  //     httpParam.set(key, params[key]) ;
  //   }
  //   return httpParam;
  // } 

  getProductList(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this.productListUrl,paramsObject )
      .pipe(
        map(response => {
         // console.log('productList');
          console.log(response);
         // console.log('productList');
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
  }
}
