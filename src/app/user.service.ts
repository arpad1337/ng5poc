import { Injectable } from '@angular/core';
import { APIService } from './api.service';
import { BroadcasterService } from './broadcaster.service';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

export interface UserDAO {
  email: string;
  name: string;
}

export const UserServiceEventKeys = {
  USER_LOGIN: 'USER_LOGIN',
  USER_LOGOUT: 'USER_LOGOUT'
};

@Injectable()
export class UserService {

  mockUser: UserDAO;
  currentUser: UserDAO;
  isFirstAttempt = false;

  constructor( private apiService: APIService, private broadcaster: BroadcasterService ) { 
    this.mockUser = {
      email: 'john@doe.com',
      name: 'John Doe'
    };
  }

  get isUserLoggedIn(): boolean {
    return this.currentUser != null;
  }

  getCurrentUser(): Promise<UserDAO> {
    return Observable.from([ this.mockUser ]).map((value) => {
      this.currentUser = value;
      if( !this.isFirstAttempt ) {
        this.isFirstAttempt = true;
        if( value ) {
          this.broadcaster.emit( UserServiceEventKeys.USER_LOGIN, value );
        } else {
          this.broadcaster.emit( UserServiceEventKeys.USER_LOGOUT );
        }
      }
      return value;
    }).toPromise();
  }

  login( email: string, password: string ): Promise<UserDAO> {
    this.currentUser = this.mockUser;
    return Observable.from([ this.mockUser ]).map((value) => {
      this.broadcaster.emit( UserServiceEventKeys.USER_LOGIN, value );
      return value;
    }).toPromise();
  }

  logout() {
    this.currentUser = null;
    this.broadcaster.emit( UserServiceEventKeys.USER_LOGOUT );
  }

}
