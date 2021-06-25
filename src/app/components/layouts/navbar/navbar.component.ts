import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Utility } from 'src/app/utility';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit() {

    const util = new Utility();
    let token = util.getToken("token");
    console.log(token);
    if(token) {
      this.isLoggedIn = true;
    } else {
      //console.log("show login")
      this.isLoggedIn = false;
    }

    this.userService.getEmitter()
      .subscribe((status) => {
        this.isLoggedIn = status
      });
  }

  onLogout() {
    this.userService.triggerIsLoggedIn.emit(false);
    this.userService.logout();
  }
}
 