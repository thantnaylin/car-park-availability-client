import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CarParkAvailability, CarparkDataEntity } from 'src/app/models/CarParkAvailability';
import { User } from 'src/app/models/User';
import { CarParkService } from 'src/app/services/car-park.service';
import { UserService } from 'src/app/services/user.service';
import { Utility } from 'src/app/utility';


@Component({
  selector: 'app-car-park',
  templateUrl: './car-park.component.html',
  styleUrls: ['./car-park.component.css']
})
export class CarParkComponent implements OnInit {

  user: User| undefined;
  showLoader: boolean = false;
  CarParkData: CarparkDataEntity[] | null | undefined;

  constructor(private _router: Router, private _userService: UserService, private _carParkService: CarParkService) { }

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
      });

    //Get Car Park Data
    this._carParkService.getCarParkData()
      .subscribe((data) => {
        if(data.items && data.items.length > 0) {
          this.CarParkData = data.items[0].carpark_data;
        } else {
          this.CarParkData = null;
        }
        this.showLoader = false;
      });
  }

}
