import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { User } from "../models/User";
import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    "Content-Type": "application/json"
  })
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "https://localhost:44358/api";

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
    console.log("Hi from the service");

    return this.http.post<User>
      (this.apiUrl + "/users", user, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }
}
