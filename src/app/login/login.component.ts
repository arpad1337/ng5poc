import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email: string = '';
  password: string = '';
  buttonEnabled = true;

  constructor( private userService: UserService, private router: Router ) {
    
  }

  get isEntryValid(): boolean {
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test( this.email ) && this.password.length >= 3;
  }

  get isButtonEnabled() {
    return this.buttonEnabled && this.isEntryValid;
  }

  ngOnInit( ) {
  }

  doLogin() {
    this.buttonEnabled = false;
    setTimeout(() => {
      this.userService.login( this.email, this.password ).then(() => {
        this.router.navigate(['/dashboard']);
      });
      this.buttonEnabled = true;
    }, 1000);
  }

}
