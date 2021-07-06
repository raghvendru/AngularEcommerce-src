import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';
import { ProductListService } from 'src/app/service/product-list.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.css']
})
export class SubCategoryComponent implements OnInit {
  public subCatList:Array<any>=[];
  @Input() itemInput :any = null;
  public CategoryID = 1;
  public pageNum : number = 1;
  public pageSize : number = 10;
  public param : any ;

  constructor(private categoryService:CategoryService,
    private _router:Router) {     
      this.param = this._router.getCurrentNavigation()?.extras.state;
      console.log(this.param) ;
      console.log(this.param.id) ;
      this.CategoryID =  this.param.id ;
  }

  ngOnInit(): void {
    console.log(this.categoryService.getSubCategory(this.CategoryID));
    this.subCatList = this.categoryService.getSubCategory(this.CategoryID).SubCategories;
    console.log(this.subCatList);
  }

  

}
