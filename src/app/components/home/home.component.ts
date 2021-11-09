// ithead@jusbid.in
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
  hotelsAmenityData: any = [];
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
        console.log(data);

        this.hotelsData = data.data;
      });

      this.hotels.getAmenities().subscribe((data: any) => {
        console.log(data);

        this.hotelsAmenityData = data.data;
      })

    }
  }

  ngDoCheck() {
    console.log('changes');
  }
}
