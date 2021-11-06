import { Component, OnInit } from '@angular/core';

// ithead@jusbid.in

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedUser: string | null = null;

  ngOnInit() {
    const userString = localStorage.getItem('login');

    if (userString) {
      this.loggedUser = JSON.parse(userString).username;
    }
  }

  logout() {
    this.loggedUser = null;
    localStorage.removeItem('login');
  }
}
