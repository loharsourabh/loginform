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
    const body = JSON.stringify({"city":"Udaipur","rooms":"1","arrival":"08-11-2021","departure":"08-11-2021","sbpc":"true","is_searchBy_HotelName":"false"});
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
