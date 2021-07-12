import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class OrderServiceService extends BaseService {

  private orderURL = 'order/get-list-object-page';
  private addorderURL = 'order/add';
  private json_key = 'order_json';

  constructor(private apiSrv: ApiService) { 
    super(apiSrv);
  }

  /* This function is used to get the list of order in paginated form*/
  getOrderList(paramObject: any) : Observable<any> {

    return this.apiSrv.getData(this.orderURL, paramObject)
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

 /* This function is used to add the order*/
 addOrder(paramObject: any) : Observable<any> {
  return this.apiSrv.postData(this.addorderURL, this.json_key, paramObject)
    .pipe(
      map(response => {
        console.log(response);
        localStorage.removeItem("cartInfo");
        return response;
      }),
      catchError(ex => {
        return ex;
      })
    );
  }
}
