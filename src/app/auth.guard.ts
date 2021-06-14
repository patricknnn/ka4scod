import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { NodeRestApiService } from './services/node-rest-api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {

  /**
   * Initialize AuthGuard
   * @param api Node api
   * @param router Router
   */
  constructor(
    private api: NodeRestApiService,
    private router: Router
  ) { }

  /**
   * CanActivate
   * @param route ActivatedRouteSnapshot
   * @param state RouterStateSnapshot
   * @returns 
   */
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    return this.checkLogin(state.url);
  }

  /**
   * Checks login status
   * @returns boolean
   */
  checkLogin(url: string): boolean {
    return true;
    if (this.api.isLoggedIn) {
      return true;
    } else {
      // Save url for redirect 
      this.api.redirectUrl = url;
      // Navigate to login 
      this.router.navigate(['/login']);
      return false;
    }

  }
}