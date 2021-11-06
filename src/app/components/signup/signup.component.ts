import { Component } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = ''
  email = ''
  password = ''
  valid = true;
  
  validateAndSave() {
    if (
      this.username.match(/[a-zA-Z0-9_]+/g) &&
      this.email.match(/[a-zA-Z0-9_]+@[a-zA-Z]+.?[a-zA-Z]+/g) &&
      this.password.match(/[a-zA-Z0-9_]{8,}/g)
    ) {
      this.valid = true;
      let users = localStorage.getItem('users');

      if (users) {
        // saved_users = JSON.parse(localStorage.getItem('users'));\
        const users_obj = JSON.parse(users);
        
      }


    }
  
    else {
      this.valid = false;
    }
  }
}
