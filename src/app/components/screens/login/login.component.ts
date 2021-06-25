import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/user.service';
import { Utility } from 'src/app/utility';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  showLoader: boolean = false;
  email: string = "";
  password: string = "";

  constructor(private _userService : UserService, private _router : Router, private _snackbar : MatSnackBar) { }

  ngOnInit(): void {
  }

  onSubmit() {

    this.showLoader = true;

    const loginInfo = {
      email: this.email,
      password: this.password
    }
   
    this._userService.login(loginInfo).subscribe(
      data => {
        const util  = new Utility();
        if(data.token) {
          util.saveToken(data.token);

          this._userService.triggerIsLoggedIn.emit(true);

          this._router.navigateByUrl("/check-car-park");
        } else {
          throw new Error();
        }
        this.showLoader = false;
        console.log(data);
      },
      error => {
        console.error("Error!", error)
        this._snackbar.open(error.error.message || "Cannot login right now.", "Close", {
          verticalPosition: "top"
        });
        this.showLoader = false;
      }
    )
  }
}
