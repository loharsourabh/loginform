import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HotelsService {
  constructor(
    private http: HttpClient,
  ) { }

  baseUrl = 'https://jusbid.in:1337';

  getHotels() {
    const hotelsUrl = `${this.baseUrl}/home-search`;
    const body = JSON.stringify({"city":"Udaipur","state":"Rajasthan","rooms":"1","guestNo":"1","arrival":"10-11-2021","departure":"11-11-2021","lat":"24.585445","long":"73.712479"});
    const reqOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      })
    }
    
    return this.http.post(hotelsUrl, body, reqOptions);
  }

  getAmenities() {
    const amenetiesUrl = `${this.baseUrl}/get-amenities`;

    return this.http.get(amenetiesUrl);
  }
}
