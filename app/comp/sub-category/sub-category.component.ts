import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductListService } from 'src/app/service/product-list.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  public menu:Array<any>=[];

  constructor(private categoryService:CategoryService,private productListSrv:ProductListService,
    private _Activatedroute:ActivatedRoute,
    private _router:Router) {
      
     }

  ngOnInit(): void {
    this.getMenu();
  }

  getMenu(){
    this.categoryService.getMenu().subscribe(
      data => {
      // console.log(data);
      this.menu =data ;
      // this.getSubMenu(HttpParams);
      // console.log(this.list);
      },
      error1 => {
        console.log(error1);
      }
    );
  
  }

}
