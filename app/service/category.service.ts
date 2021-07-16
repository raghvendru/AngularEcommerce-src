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
  private menuObj :any ;

  constructor(private apiSrv: ApiService) {
    super(apiSrv);
   }


  /* This function gives the category and its subCategories information*/

   getMenu() : Observable<any> {

    return this.apiSrv.getData(this.menuURL, null)
      .pipe(
        map(response => {
          console.log(response);
          this.menuObj= response;
          return response;
        }),
        catchError(ex => {
          return ex;
        })
      );
 }


 /* This function gives the Subcategories info based on the category */ 
 getSubCategory(cat : number) : any {
  console.log(cat);
  console.log(this.menuObj);
  let obj = null ;
  for (const menu of this.menuObj) {
    if (menu.CategoryID == cat ) {
      obj = menu ;
      break ;
    }
  }
  return obj;
 }
 
}


