import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isButtonEnabled = true;
  email: string;
  password: string;

  constructor( private userService: UserService ) {
    
  }

  ngOnInit( ) {
  }

  async doLogin() {
    this.isButtonEnabled = false;
    await this.userService.login( this.email, this.password );
    this.isButtonEnabled = true;
  }

}
