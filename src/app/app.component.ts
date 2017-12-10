import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserDAO, UserServiceEventKeys } from './user.service';
import { BroadcasterService } from './broadcaster.service';
import { Autobind } from './app.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'app';
  currentUser: UserDAO = null;
  constructor( 
    private userService: UserService, 
    private broadCaster: BroadcasterService, 
    private router: Router
  ) {
    this.broadCaster
      .on<UserServiceEventKeys>(UserServiceEventKeys.USER_LOGIN)
      .subscribe(this.onUserLogin);
    this.broadCaster
      .on<UserServiceEventKeys>(UserServiceEventKeys.USER_LOGOUT)
      .subscribe(this.onUserLogout);
    this.userService.getCurrentUser();
  }

  @Autobind
  onUserLogin( user ) {
    this.currentUser = user;
  }

  @Autobind
  onUserLogout() {
    this.currentUser = null;
    this.router.navigate(['/login']);
  }

  get userLoggedIn() {
    return this.userService.isUserLoggedIn;
  }

  logout() {
    this.userService.logout();
  }

 }
