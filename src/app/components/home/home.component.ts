// ithead@jusbid.in
import { Component, DoCheck, OnInit } from '@angular/core';
import { HotelsService } from '../../services/hotels.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, DoCheck {
  constructor(
    private hotels: HotelsService,
  ) {}

  baseUrl = this.hotels.baseUrl;
  loggedUser: string | null = null;
  allHotels: any = [];
  filteredHotels: any = [];
  allAmenities: any = [];
  amenityNames: any = [];
  amenitiesMatched = false;
  hotelSearch = '';

  updateHotelSearch(hotelName: string) {
    if (hotelName.length === 0) {
      this.filteredHotels = this.allHotels;
    }

    else if (hotelName.length > 0) {
      this.filteredHotels = this.allHotels.filter((hotel: any) => {
        return hotel.name.toLowerCase().includes(hotelName.toLowerCase());
      });
    }
  }
  
  updateCitySearch(cityName: string) {
    if (cityName.length) {
      this.hotels.getHotels(cityName).subscribe((data: any) => {
        this.allHotels = data.data;
        this.filteredHotels = data.data;
      })
    }
  }

  logout() {
    this.loggedUser = null;
    localStorage.removeItem('login');
  }

  ngOnInit() {
    const userString = localStorage.getItem('login');
    
    if (userString) {
      this.loggedUser = JSON.parse(userString).username;

      this.hotels.getHotels('Udaipur').subscribe((data: any) => {
        this.allHotels = data.data;
        this.filteredHotels = data.data;
      });

      // fetch amenities
      this.hotels.getAmenities().subscribe((data: any) => {
        this.allAmenities = data.data;
      });
    }
  }
  
  ngDoCheck() {
    // matching amenity ids
    if (
      !this.amenitiesMatched &&
      this.filteredHotels.length &&
      this.allAmenities.length
    ) {
      for (let hotel of this.filteredHotels) {
        this.amenityNames.push({
          id: hotel.id,
          names: [],
        });

        for (let amenityId of hotel.hotel_amenities) {
          for (let amenityObj of this.allAmenities) {
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

      this.amenitiesMatched = true;
    }
  }
}
