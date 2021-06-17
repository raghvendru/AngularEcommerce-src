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

}
