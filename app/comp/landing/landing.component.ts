/* 
 * Fuctionality: this page shows the menu which includes catergories.
 * 
 * Entry Point: This is the main page.
 * 
 * What data you need: the data of the category list and sub category
 * 
 * How do you get data: we get data calling the menu service .
 * 
 * Important Variable: menu - array of categories and sub categories
 * 
 * Structure of data (object / json): JSON Array.
 * 
 * Out Navigation:It navigates to SubCategories.
 * 
 * 
 */
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})

/*
 * Declaration of variables 
 */
export class LandingComponent implements OnInit {

  // public category:Array<any>=[];
  public menu:Array<any>=[];

 /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
  constructor(private _router:Router,private categoryService:CategoryService) { }

  /*
  *On initialization this function is called
  */ 
  ngOnInit(): void {
    this.getMenu();
  }


  /* by calling the category service we fetch the category list  */
  getMenu(){
    this.categoryService.getMenu().subscribe(
      data => {
      this.menu =data ;
      console.log(this.menu);
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  /* on clicking on the categories we get the sub-categories based on categoryid */
  onClickItem(catid: number){
    console.log(catid);
    this._router.navigateByUrl("/subCategory",{state : {id: catid}});
  }
}
