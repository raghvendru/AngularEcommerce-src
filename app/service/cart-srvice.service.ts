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

  /* This function is used to get the cart information
   based on customerid and sessionid */
   getCart(paramObject: any) : Observable<any> {
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

 /* This is function is used to delete the cart item */
 deleteCartItem(paramObject: any) : Observable<any> {
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

 /* This is function is used to update the cart item  i.e Quantity */
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


/* This function is used to add the cart items to the cart */
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
