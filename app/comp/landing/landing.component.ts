import { Component, OnInit } from '@angular/core';
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

  onClickItem(){
    // this.selectedItem = item;
    this._router.navigateByUrl("/subCategory");
    
  }

}
