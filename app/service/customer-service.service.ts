import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceService extends BaseService{
  private custAuthenticateURL: String = 'customer/customer-authentication';

  constructor(private apiSrv:ApiService) {
    super(apiSrv);
  }

  custAuthenticate(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this.custAuthenticateURL,paramsObject )
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
