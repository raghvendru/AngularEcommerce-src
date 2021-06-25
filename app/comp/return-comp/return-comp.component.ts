import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-return-comp',
  templateUrl: './return-comp.component.html',
  styleUrls: ['./return-comp.component.css']
})
export class ReturnCompComponent implements OnInit {
public item : any={};
  constructor(private _Activatedroute:ActivatedRoute,
    private _router:Router) { 
    // this.item = this._router.getCurrentNavigation()?.extras.;
  }

  ngOnInit(): void {
  }

}
