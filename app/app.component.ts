import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './service/category.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  title = 'shopping';
  public menu:Array<any>=[];
  public selectedItem = null;

  ngOnInit(): void {
    this.getMenu();
    this.back();
  }

  constructor(private categoryService:CategoryService,private _Activatedroute:ActivatedRoute,
    private _router:Router){
      
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

  back() {
    this._router.navigate(['/landing']);
  }
}
