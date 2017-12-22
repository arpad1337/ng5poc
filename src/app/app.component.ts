import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService, UserDAO, UserServiceEventKeys } from './user.service';
import { BroadcasterService } from './broadcaster.service';
import { APIService } from './api.service';
import { Autobind } from './app.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {

  currentUser: UserDAO = null;
  
  constructor( 
    private userService: UserService, 
    private broadcaster: BroadcasterService, 
    private router: Router,
    private apiService: APIService
  ) {
    this.broadcaster
      .on<UserServiceEventKeys>(UserServiceEventKeys.USER_LOGIN)
      .subscribe(this.onUserLogin);
    this.broadcaster
      .on<UserServiceEventKeys>(UserServiceEventKeys.USER_LOGOUT)
      .subscribe(this.onUserLogout);
    this.userService.getCurrentUser();
  }

  ngOnInit() {
    this.apiService.echo().then((r) => {
      console.log('DONE');
    });
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
