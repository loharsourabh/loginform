// ithead@jusbid.in
import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private hotels: HotelsService,
  ) { }

  loggedUser: string | null = null;
  hotelsData: any = [];
  amenityCollection: any = [];
  amenityNames: any = [];
  amenitiesMatched = false;

  baseUrl = this.hotels.baseUrl;

  logout() {
    this.loggedUser = null;
    localStorage.removeItem('login');
  }

  ngOnInit() {
    const userString = localStorage.getItem('login');

    if (userString) {
      this.loggedUser = JSON.parse(userString).username;

      this.hotels.getHotels().subscribe((data: any) => {
        this.hotelsData = data.data;
      });

      this.hotels.getAmenities().subscribe((data: any) => {
        this.amenityCollection = data.data;
      })

    }
  }

  ngDoCheck() {
    if (
      !this.amenitiesMatched &&
      this.hotelsData.length &&
      this.amenityCollection.length
    ) {
      for (let hotel of this.hotelsData) {
        this.amenityNames.push({
          id: hotel.id,
          names: [],
        });

        for (let amenityId of hotel.hotel_amenities) {
          for (let amenityObj of this.amenityCollection) {
            const names = this.amenityNames[this.amenityNames.length - 1].names;

            if (names.length === 3) {
              break;
            }

            if (amenityId === amenityObj.id) {
              names.push(amenityObj.name);
            }
          }
        }
      }

      console.log(['amenityCollection', this.amenityCollection]); 
      console.log(['hotesData', this.hotelsData]);
      console.log(this.amenityNames);
      
      this.amenitiesMatched = true;
    }
  }
}
