import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class StateServiceService extends BaseService {
  private _urlStateList = 'state/get-list';

  constructor(private apiSrv:ApiService) {
    super(apiSrv);
   }
   getStateList(paramsObject:any) : Observable<any> {
    console.log(paramsObject);
    return this.apiSrv.getData(this._urlStateList,paramsObject )
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
