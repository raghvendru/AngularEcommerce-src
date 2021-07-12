import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerServiceService } from 'src/app/service/customer-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public phone: any;
  public password:String ="" ;
  public custDetail: any = {};
  public cartInfo : any = [];
  public sessionInfo:any = {};
  
  constructor(private cstSrv: CustomerServiceService, private _Activatedroute:ActivatedRoute,
    private _router:Router) {
     }

  ngOnInit(): void {
    this.sessionInfo = localStorage.getItem('sessionID');
    this.sessionInfo  = JSON.parse(this.sessionInfo );
  }
  
  onClick(){
    this.getCustDetails();
    this.cartInfo = localStorage.getItem('cartInfo');
    if (this.cartInfo == null) {
      this._router.navigateByUrl('/landing');
    } else {
      this._router.navigateByUrl('/checkout');
    }
  }
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

