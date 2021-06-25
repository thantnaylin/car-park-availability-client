import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarParkAvailability } from '../models/CarParkAvailability';
import { Utility } from '../utility';

@Injectable({
  providedIn: 'root'
})
export class CarParkService {

  private _apiUrl = "https://localhost:44358/api";
  
  constructor(private http: HttpClient) { }

  getCarParkData(): Observable<CarParkAvailability> {
    const util = new Utility();
    let token = util.getToken("token");
    let header = {
      headers: new HttpHeaders()
        .set("Authorization", `Bearer ${token}`)
    };
    return this.http.get<CarParkAvailability>(`${this._apiUrl}/carpark`, header);
  }

}
 