import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(
    private router: Router,
  ) {}

  username = '';
  email = '';
  password = '';
  valid = true;
  unique = true;

  uniqueUser(userData: User[], currentUser: User) {
    for (let user of userData) {
      for (let key in user) {
        if (
          (key === 'username' || key === 'email') &&
          user[key] === currentUser[key]
        ) {
          
          return false;
        }
      }
    }
    
    return true;
  }
  
  validateAndSave() {
    if (
      this.username.match(/[a-zA-Z0-9_]+/g) &&
      this.email.match(/[a-zA-Z0-9_]+@[a-zA-Z]+.?[a-zA-Z]+/g) &&
      this.password.match(/[a-zA-Z0-9_]{8,}/g)
    ) {

      this.valid = true;
      const usersRaw = localStorage.getItem('usersRaw');
      const currentUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      }

      if (usersRaw) {
        const users = JSON.parse(usersRaw);

        if (this.uniqueUser(users, currentUser)) {
          users.push(currentUser);
          localStorage.setItem('usersRaw', JSON.stringify(users));
          localStorage.setItem('login', JSON.stringify(currentUser));
          this.router.navigateByUrl('/');
        }

        else {
          this.unique = false
        }
      }

      else {
        localStorage.setItem('usersRaw', JSON.stringify([currentUser]));
      }
    }

    else {
      this.valid = false;
    }
  }
}