import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-return-comp',
  templateUrl: './return-comp.component.html',
  styleUrls: ['./return-comp.component.css']
})
export class ReturnCompComponent implements OnInit {
public order : any={};
public reason:string ="";
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router) { 
      this.order = this._router.getCurrentNavigation()?.extras.state;
      console.log("hii");
      console.log(this.order);
  }

  ngOnInit(): void {
  }

  onClickConfirm(){
    this._router.navigateByUrl('/landing');
  }

}
