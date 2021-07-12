import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class SubCategoryService extends BaseService {
  private submenuURL = 'menu/get-menu';

  constructor(private apiSrv:ApiService) {
    super(apiSrv);
  }

  getMenu() : Observable<any> {

    return this.apiSrv.getData(this.submenuURL, null)
      .pipe(
        map(response => {
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
 }
}
