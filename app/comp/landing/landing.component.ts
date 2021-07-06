import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  public selectedItem = null;
  public category:Array<any>=[];
  public menu:Array<any>=[];
  pageNum : number = 1 ;
  pageSize : number = 10;


  constructor(private _router:Router,private categoryService:CategoryService) { }

  ngOnInit(): void {
    this.getMenu();
  }



  getMenu(){

    this.categoryService.getMenu().subscribe(
      data => {
      // console.log(data);
      this.menu =data ;
      // this.getSubMenu(HttpParams);
      console.log(this.menu);
      },
      error1 => {
        console.log(error1);
      }
    );
  
  }

  getSubCategory(cat: number) {
    
  }

  onClickItem(catid: number){
    // this.selectedItem = item;
    console.log(catid);
    this._router.navigateByUrl("/subCategory",{state : {id: catid}});
    
  }

}
