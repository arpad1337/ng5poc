import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( 
    private userService: UserService,
    private router: Router
  ) { 
   
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot  ) {
    return this.userService.isUserLoggedIn;
  }

}
