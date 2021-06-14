import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {



  title = 'shopping';
public menu:Array<any>=[];

  ngOnInit(): void {
    this.getMenu();
  }

  constructor( private categoryService:CategoryService) {
  }

  getMenu(){
    this.categoryService.getMenu().subscribe(
      data => {
      console.log(data);
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
