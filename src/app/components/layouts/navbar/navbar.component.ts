import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit() {
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
 