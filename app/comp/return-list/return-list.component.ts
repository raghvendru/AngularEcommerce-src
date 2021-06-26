import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-return-list',
  templateUrl: './return-list.component.html',
  styleUrls: ['./return-list.component.css']
})
export class ReturnListComponent implements OnInit {
  public returnlist : any =[];

  constructor() { }

  ngOnInit(): void {
  }

}
