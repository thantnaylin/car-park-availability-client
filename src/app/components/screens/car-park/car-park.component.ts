import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';
import { Utility } from 'src/app/utility';


@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  user: User | undefined;
  showLoader: boolean = false;

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    const util = new Utility();
    if(!util.getToken("token")) {
      this._router.navigateByUrl("/login");
    }

    //Get profile
    this.showLoader = true;
    this._userService.getProfile()
      .subscribe((user) => {
        this.user = user;
        this.showLoader = false;
      });
  }

}
