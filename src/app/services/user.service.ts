import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from "../models/User";
import { Login } from '../models/Login';
import { Utility } from '../utility';
import { Router } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {

  @Output() triggerIsLoggedIn: EventEmitter<any> = new EventEmitter();

  private _apiUrl = "https://localhost:44358/api";

  constructor(private http: HttpClient, private _router: Router) { }

  getEmitter() {
    return this.triggerIsLoggedIn;
  }

  private handleError(error: HttpErrorResponse) {
    if(error.status === 0) {
      console.log(`An error occurred: ${error.error}`);
    } else {
      `Backend returned code ${error.status}, body was: ${error.error}`
    }
    return throwError(error);
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>
      (`${this._apiUrl}/users`, user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
  
  getProfile(): Observable<User> {
    const util = new Utility();
    let token = util.getToken("token");
    
    let header = {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${token}`)
    };

    return this.http.get<User>
      (`${this._apiUrl}/users/profile`, header)
      .pipe(
        catchError(this.handleError)
      )
  }

  login(login: Login): Observable<Login> {
    return this.http.post<Login>
      (`${this._apiUrl}/users/login`, login, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  logout() {
    localStorage.removeItem("token");
    this._router.navigateByUrl("/login");
  }
}
