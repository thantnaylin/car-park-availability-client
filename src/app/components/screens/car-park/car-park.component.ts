import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Utility } from 'src/app/utility';


@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit(): void {
    const util = new Utility();
    if(!util.getToken("token")) {
      this._router.navigateByUrl("/login");
    }
  }

}
