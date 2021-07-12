/* 
 * Fuctionality: this page contains  credentials.
 * 
 * Entry Point: .
 * 
 * What data you need: the customer details.
 * 
 * How do you get data: we get data calling the customer service .
 * 
 * Important Variable: custDetail.
 * 
 * Structure of data (object / json): JSON Array.
 * 
 * Out Navigation:It navigates to landing or to the checkout.
 * 
 * 
 */
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

/*
 * Declaration of variables 
 */
export class LoginComponent implements OnInit {

  public phone: any;
  public password:String ="" ;
  public custDetail: any = {};
  public cartInfo : any = [];
  public sessionInfo:any = {};
  
  /*
  * In this function we are injecting the class of category service and producr List service 
  * requests dependencies from external sources rather than creating them.
  * Storing the information to the local storage
  * We get the information in the form of JSON and converting it into srting.
  */
  constructor(private cstSrv: CustomerServiceService, private _Activatedroute:ActivatedRoute,
    private _router:Router) {
     }

  /*
  *On initialization this function is called
  */ 
  ngOnInit(): void {
    this.sessionInfo = localStorage.getItem('sessionID');
    this.sessionInfo  = JSON.parse(this.sessionInfo );
  }
  
  /* on click of submit it navigates to the main page or to the orderConfirmation */
  onClick(){
    this.getCustDetails();
    this.cartInfo = localStorage.getItem('cartInfo');
    if (this.cartInfo == null) {
      this._router.navigateByUrl('/landing');
    } else {
      this._router.navigateByUrl('/checkout');
    }
  }

  /* by calling the service we fetch the data of the customer*/
  getCustDetails() {
    let param:any= {} ;
    param['session_id'] = this.sessionInfo.sessionID;
    param['phone_num'] = this.phone ;
    param['password'] = this.password;
    // call the service method to fetch the data
    this.cstSrv.custAuthenticate(param).subscribe(
      data => {
       console.log(data);
       this.custDetail = data;
        if ( this.custDetail != null) {
          let loginInfo = localStorage.getItem('loginInfo');
          localStorage.setItem("loginInfo", JSON.stringify(this.custDetail));
          alert('login successful');
        }  else {
          alert('invalid Credentials');
          this._router.navigateByUrl("/login");
        }
      },
      error1 => {
        console.log(error1);
      }
    );
  }
}

