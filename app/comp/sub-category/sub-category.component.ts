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
      this.CategoryID =  this.param.id ;
  }

  ngOnInit(): void {

    this.subCatList = this.categoryService.getSubCategory(this.CategoryID).SubCategories;
  }

  

}
