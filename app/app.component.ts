import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from './service/category.service';
import { ProductListService } from './service/product-list.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  

  title = 'shopping';
  public menu:Array<any>=[];
  public selectedItem = null;
  private pageSize : number = 10;
  private pageNum : number= 1;
 
  public productList:Array<any>=[];
  


  

  ngOnInit(): void {
    this.getMenu();
    // this.back();
  }

  constructor(private categoryService:CategoryService,private productListSrv:ProductListService,
    private _Activatedroute:ActivatedRoute,
    private _router:Router){

     let loginInfo = localStorage.getItem('loginInfo');
     if ( loginInfo !=null) {
       console.log('loginInfo:' ,JSON.parse(loginInfo));
     } else {
       let token = this.getToken();
       let info :any = {}
       info = {'loginInfo':token}
       localStorage.setItem('loginInfo',JSON.stringify(info));
     }
       
    }
  
    getToken() : String{
      let token ="";
      while(token.length<10) {
        let num =Math.floor(Math.random()*10);
        token = token +num.toString();
      }
      return token;
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

  rel(){
       location.reload();
  // this._router.navigate(['/landing']);
  
    
  }

  onClickItem(a: any){
    this.selectedItem = a;
    console.log(this.selectedItem)
    // console.log(this.selectedItem);
    // this._router.navigate(['productdetail', this.selectedItem]);
    // this._router.navigate(['productdetail', [item] = item]);
    // this._router.navigateByUrl('/productdetail', state :{ ProductID: item.ProductID});
    // this._router.navigateByUrl('/productdetail', { state: { ProductID:item.ProductID , Name:item.Name, BrandID:item.BrandID, Description:item.Description, ImageURL:item.ImageURL, Price:item.Price, SubCategoryID:item.SubCategoryID, SubCategoryName:item.SubCategoryName, SubCategoryDesc:item.SubCategoryDesc, SubCategoryImage:item.SubCategoryImage, BrandName:item.BrandName } });
      
  }
}
