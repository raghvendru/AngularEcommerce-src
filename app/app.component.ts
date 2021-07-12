/**
 * 
 * Designed and Developed by ITfyME.com Students
 * Batch of Feb 2021
 * Vyshnavi, Rajashree, Shreya, Pooja
 * 
 */

/*
 * Main entry point of the appliction 
 * 
 * Fuctionality: It is parent for all the components.
 * 
 * Entry Point: This is the first entry point.
 * 
 * What data you need: Categories and sub-categories
 * 
 * How do you get data: calling api service
 * 
 * Important Variable: menu of type JSON array
 * 
 * Structure of data (object / json):JSON Array
 * 
 * Out Navigation: navigates to the sub-category list depending on the category
 * 
 * 
 */
import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './service/category.service';
import { ProductListService } from './service/product-list.service';
import { RouterModule,Routes } from '@angular/router';
import { CustomerServiceService } from './service/customer-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'shopping';
  public search:string = "";
 
  public productList:Array<any> = [];
  public menu:Array<any> = [];
  public sessionInfo : any = {};
  public loginDetail : any = {};
  /*
  *On initialization this function is called
  */
  ngOnInit(): void {
    this.getMenu();
    this.autoLogin();
  }

  /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
  constructor(private categoryService:CategoryService, private cstSrv: CustomerServiceService, private productListSrv:ProductListService,
    private _router:Router){
     let loginInfo = localStorage.getItem('sessionID');
     if ( loginInfo == null) {
       let token = this.getToken();
       let info :any = {}
       info = {'sessionID':token}
       localStorage.setItem('sessionID',JSON.stringify(info));
      }   
    }

    /* this function returns a unique token which is a combination of 10 digit
    * this is called only once when first time uses comes to the websitek 
    * and stores in the local storage for subsquent identification of returning user
    * 
    * randmoize the number, get a ditigit by flooring and generate string
    */
  
  getToken() : String{
    let token = "";
    while(token.length < 10) {
      let num = Math.floor(Math.random()*10);
      token = token +num.toString();
    }
    return token;
  }

  /*
  * This function returns the categories and sub-categories
  */
  getMenu() {
    this.categoryService.getMenu().subscribe(
      data => {
      this.menu = data ;
      },
      error1 => {
        console.log(error1);
      }
    );
  
  }

  /*
    This function is used to navigate to landing page when clicked on home  
  */
  onClickHome() {
    this._router.navigateByUrl("/landing");
  }

  /*
    This function is used to navigate to cart page when clicked on cart icon 
  */
  onClickCart() {
    this._router.navigateByUrl("/cart");
  }

  /*
    This function is used to navigate to login page when clicked on login icon 
  */
  onClickUser() {
    this._router.navigateByUrl("/login");
  }

  /*
    This function is used for navigating to the productList through search.
  */
  onClickSearch() {
    console.log(this.search);
     this._router.navigateByUrl("/product/"+ this.search);
  }

  autoLogin() {
    this.sessionInfo = localStorage.getItem('sessionID');
    this.sessionInfo  = JSON.parse(this.sessionInfo );
    this.loginDetail= localStorage.getItem('loginInfo') 
    this.loginDetail  = JSON.parse(this.loginDetail );
    let param : any =  {} ;
    if(this.loginDetail != null ) {
      param['session_id'] = this.sessionInfo.sessionID;
      param['phone_num'] = this.loginDetail.Phone ;
      param['password'] = this.loginDetail.Password;
      this.cstSrv.custAuthenticate(param).subscribe(
        data => {
          console.log(data);
          let loginInfo = localStorage.getItem('loginInfo');
          localStorage.setItem("loginInfo", JSON.stringify(data)); 
          console.log("auto login is  successful");
        },
        error1 => {
          console.log(error1);
        }
      );
    } else {
      console.log("auto login is not successful");
    }
  }

}






