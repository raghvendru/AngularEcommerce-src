import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {

  private myCartCount = new BehaviorSubject(0);
  sharedMessage = this. myCartCount.asObservable();

  constructor() {

  }


  myCartCountMethod ( myCartCount: number ){
    this.myCartCount.next( myCartCount)
  }

}
