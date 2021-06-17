import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import {catchError, map, retry, timeout} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseService {
// GetListPage - pageNum, pageSize and other parameters
  // GetList - ids
  // Get  - id
  // Add - object
  // Update - object
  // Delete - object


  protected url: string = "";

  constructor(private apiService: ApiService) { }

  protected preGetListPage() {
  }

  // getListPage(paramsObject) {
  //   this.preGetListPage();
  //   return this.apiService.getData(this.url, paramsObject);
  // }

  // getListPage(paramsObject)  {
  //   this.preGetListPage();
  //   this.apiService.getData(this.url, paramsObject).subscribe(data => {
  //     console.log(data) ;
  //     // return data ;
  //     return this.postGetListPage(paramsObject)
  //   },
  //   );

  // }

  

  getListPage(paramsObject:any) : Observable<any> {
    this.preGetListPage();

    return this.apiService.getData(this.url, paramsObject)
      .pipe(
        map(response => {
          return this.postGetListPage(response);
        }),
        catchError(ex => {
          return ex;
        })
      );
 }

  protected postGetListPage(responseJson:any) {
    return responseJson;
  }
 
}
