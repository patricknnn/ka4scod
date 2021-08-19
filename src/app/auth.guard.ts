import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './services/firestore/auth.service';
import { NodeRestApiService } from './services/node-rest-api.service';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(
        private auth: AuthService,
        private api: NodeRestApiService,
        private router: Router
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): boolean {
        return this.checkLogin(state.url);
    }

    checkLogin(url: string): boolean {
        if (this.auth.isLoggedIn) {
            return true;
        } else {
            // Save url for redirect
            this.auth.redirectUrl = url;
            // Navigate to login
            this.router.navigate(['/fb-login']);
            return false;
        }
    }
}
