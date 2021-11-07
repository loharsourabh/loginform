import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(
    private router: Router
  ) {}

  username = '';
  password = '';
  exists = true;
  
  loginUser() {
    const usersRaw = localStorage.getItem('usersRaw');

    if (usersRaw) {
      for (let user of JSON.parse(usersRaw)) {
        if (
          user.username === this.username &&
          user.password === this.password
        ) {
          localStorage.setItem('login', JSON.stringify(user));
        }
      }

      if (localStorage.getItem('login')) {
        this.router.navigateByUrl('/');
      }

      else {
        this.exists = false;
      }
    }

    else {
      this.exists = false;
    }
  }

  closeError() {
    this.exists = true;
  }
}
