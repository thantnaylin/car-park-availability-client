import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { User } from "../models/User";
import { Login } from '../models/Login';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private _apiUrl = "https://localhost:44358/api";

  constructor(private http: HttpClient) { }

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
  
  login(login: Login): Observable<Login> {
    return this.http.post<Login>
      (`${this._apiUrl}/users/login`, login, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
