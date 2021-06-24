import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { UserForm } from 'src/app/models/UserForm';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {

  userForm : FormGroup | undefined;
  user: UserForm | undefined;
  showLoader: boolean = false;

  constructor(private _userService : UserService, private _router: Router, private _snackbar: MatSnackBar) { }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      firstName: new FormControl(this.user?.firstName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      lastName : new FormControl(this.user?.lastName, [
        Validators.required,
        Validators.minLength(2)
      ]),
      email : new FormControl(this.user?.email, [
          Validators.required,
          Validators.email
      ]),
      password : new FormControl(this.user?.password, [
        Validators.required,
        Validators.minLength(6)
      ]),
      confirmPassword : new FormControl(this.user?.password, [
        Validators.required,
        this.matchPasswordValidator()
      ]),
      contactNo : new FormControl(this.user?.contactNo, [])
    });
  }

  get firstName() { return this.userForm?.get("firstName"); }
  get lastName() { return this.userForm?.get("lastName"); }
  get email() { return this.userForm?.get("email"); }
  get password() { return this.userForm?.get("password"); }
  get confirmPassword() { return this.userForm?.get("confirmPassword"); }
  get contactNo() { return this.userForm?.get("contactNo"); }

  matchPasswordValidator () : ValidatorFn {
    return (c: AbstractControl) : ValidationErrors | null => {

      const value = c.value;

      if(!value) return null;

      const p1  = this.password;

      let isMatch = p1?.value === value;
      return !isMatch ? { mismatched: true } : null;
    }
  }

  onSubmit() {

    if(this.userForm?.invalid) {
      this.userForm.setErrors({ ...this.userForm.errors, "formError": true });
      return;
    }

    const newUser = {
      firstName: this.firstName?.value,
      lastName: this.lastName?.value,
      email: this.email?.value,
      password: this.password?.value,
      contactNumber: this.contactNo?.value
    }

    this.showLoader = true;
    this._userService.addUser(newUser)
      .subscribe(
        data => {
          alert("Successfully created!");
          this.showLoader = false;
          this._router.navigateByUrl("/login");
        },

        error => {
          console.error("Error!", error)
          this._snackbar.open(error.error.message || "Something went wrong", "Close", {
            verticalPosition: "top"
          });
          this.showLoader = false;
        }
      )
  }
}
