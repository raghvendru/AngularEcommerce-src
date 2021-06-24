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
  private sessionid: String = "1234";
  public password:String ="" ;
  public custDetail: any = {};
  public msg :String="customerdd";
  constructor(private cstSrv: CustomerServiceService, private _Activatedroute:ActivatedRoute,
    private _router:Router) {
     
     

     }

  ngOnInit(): void {
  }
  
  onClick(){
    this.getCustDetails();
    console.log("variables ---");
    console.log(this.phone);
    console.log(this.password);
    
    // this._router.navigateByUrl('/checkout', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
  }
  getCustDetails() {
    // console.log("hii");
    let param:any= {} ;
    param['session_id'] = this.sessionid;
    param['phone_num'] = this.phone ;
    param['password'] = this.password;

    // call the service method to fetch the data
    this.cstSrv.custAuthenticate(param).subscribe(
      data => {
       console.log(data);
       this.custDetail = data;
       let loginInfo = localStorage.getItem('loginInfo');

        if ( loginInfo !=null) {
          let obj = JSON.parse(loginInfo);
          obj.loginInfo =  this.custDetail;
          console.log('loginInfo:' ,JSON.parse(loginInfo));
          localStorage.setItem("loginInfo",JSON.stringify(obj));
        } 

        
      },
      error1 => {
        console.log(error1);
      }
    );
  }

  



}
