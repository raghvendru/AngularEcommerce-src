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
  private updateAddressURL: String = 'customer_address/update';
  private json_key : string = 'customer_address_json';
  
  constructor(private apiSrv:ApiService) {
    super(apiSrv);
  }
  
  /* This function is used to verify the user credential
   if user credentials are valid this function gives the 
   user object which includes user information , user address informaton,
   and cart information.*/
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
  /* This function is used to send the update customer address details*/ 
  updateCustomerAddress(paramObject: any) : Observable<any> {
    return this.apiSrv.postData(this.updateAddressURL, this.json_key, paramObject)
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
