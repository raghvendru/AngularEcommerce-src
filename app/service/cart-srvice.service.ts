import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})


export class CartSrviceService extends BaseService{

  private cartURL = 'cart/get-object';
  private deleteURL = 'cart/delete-item';
  private json_key = 'cart_json';
  private addURL = 'cart/add';
  private updateURL = 'cart/update-item';
  public cartInfo : any =[];

  constructor(private apiSrv: ApiService) {
    super(apiSrv);
   }

   getCart(paramObject: any) : Observable<any> {

    console.log(paramObject);
    return this.apiSrv.getData(this.cartURL, paramObject)
      .pipe(
        map(response => {
          console.log("serviceresponse");
          console.log(response);
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
 }

 
 deleteCartItem(paramObject: any) : Observable<any> {

  console.log(paramObject);
  return this.apiSrv.postData(this.deleteURL, this.json_key, paramObject)
    .pipe(
      map(response => {
        console.log("serviceresponse");
        console.log(response);
        return response;
      }),
      catchError(ex => {
        return ex;
      })
    );
} 

updateCartItem(paramObject: any) : Observable<any> {
  return this.apiSrv.postData(this.updateURL, this.json_key, paramObject)
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
addCartItem(paramObject: any) : Observable<any> {
  this.cartInfo.push(paramObject.cartitem);
  localStorage.setItem('cartInfo',JSON.stringify(this.cartInfo));
  
  return this.apiSrv.postData(this.addURL, this.json_key, paramObject)
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
