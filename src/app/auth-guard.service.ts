import { Injectable } from '@angular/core';
import { UserService } from './user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor( 
    private userService: UserService,
    private router: Router
  ) { 
   
  }

  canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): Promise<boolean> {
    return this.userService.getCurrentUser().then((_) => {
      return this.userService.isUserLoggedIn;
    });
  }

}
