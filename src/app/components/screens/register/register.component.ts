import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { UserForm } from 'src/app/models/UserForm';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit {

  userForm : FormGroup | undefined;
  user: UserForm | undefined;

  constructor() { }

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
      contactNo: this.contactNo?.value
    }
    console.log(newUser);
  }
}
