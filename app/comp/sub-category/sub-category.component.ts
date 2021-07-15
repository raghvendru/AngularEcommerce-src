/* 
 * Fuctionality: this page shows the sub catgories for a selected category
 * 
 * Entry Point: From landing page on clicking of Category icon
 * 
 * What data you need: need list of sub category by calling category serevice passing the category id
 * 
 * How do you get data: parent is passing the data through @input -- only categoryID
 * 
 * Important Variable: sucCatList - array of categories and sub categories
 * 
 * Structure of data (object / json): JSON Array.
 * 
 * Out Navigation:It navigates to product list page.
 * 
 * 
 */
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
