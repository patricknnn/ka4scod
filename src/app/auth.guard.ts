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
    const url: string = state.url;
    return this.checkLogin();
  }

  /**
   * Checks login status
   * @returns boolean
   */
  checkLogin(): boolean {
    if (this.api.isLoggedIn) {
      return true;
    } else {
      // Navigate to the login page with extras
      this.router.navigate(['/login']);
      return false;
    }

  }
}