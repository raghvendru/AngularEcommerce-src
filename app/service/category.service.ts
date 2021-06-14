import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {

  private menuURL = 'menu/get-menu';
  

  constructor(private apiSrv: ApiService) {
    super(apiSrv);
   }

  
  

   getMenu() : Observable<any> {

    return this.apiSrv.getData(this.menuURL, null)
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
