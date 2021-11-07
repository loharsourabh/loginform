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
  validUsername = true;
  validEmail = true;
  validPassword = true;
  unique = true;

  uniqueUser(userData: User[], newUser: User) {
    for (let user of userData) {
      for (let key in user) {
        if (
          (key === 'username' || key === 'email') &&
          user[key] === newUser[key]
        ) {
          
          return false;
        }
      }
    }
    
    return true;
  }
  
  validateAndSave() {
    this.validUsername = /[a-zA-Z0-9_]+/.test(this.username);
    this.validEmail = /^[a-zA-Z0-9_]+@[a-zA-Z]+.?[a-zA-Z]+$/.test(this.email);
    this.validPassword = /[a-zA-Z0-9_]{8,}/.test(this.password);


    if (
      this.validUsername &&
      this.validEmail &&
      this.validPassword
    ) {

      const usersRaw = localStorage.getItem('usersRaw');
      const newUser = {
        username: this.username,
        email: this.email,
        password: this.password,
      }

      if (usersRaw) {
        const users = JSON.parse(usersRaw);

        if (this.uniqueUser(users, newUser)) {
          users.push(newUser);
          localStorage.setItem('usersRaw', JSON.stringify(users));
          localStorage.setItem('login', JSON.stringify(newUser));
          this.router.navigateByUrl('/');
        }

        else {
          this.unique = false
        }
      }

      else {
        localStorage.setItem('usersRaw', JSON.stringify([newUser]));
        localStorage.setItem('login', JSON.stringify(newUser));
        this.router.navigateByUrl('/');
      }
    }
  }

  closeError() {
    this.unique = true;
  }
}