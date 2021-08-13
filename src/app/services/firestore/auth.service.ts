import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from '../dialog.service';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    isLoggedIn: boolean = false;
    isAdmin: boolean = false;
    loggedInUser: any;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private dialog: DialogService
    ) {}

    login(email: string, password: string) {
        this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((value) => {
                this.isLoggedIn = true;
                this.isAdmin =
                    value.user?.uid == 'YTHqdekzOpON2Y0ggO2Uly8bmKC2'
                        ? true
                        : false;
                this.loggedInUser = value.user;
                this.dialog.succesDialog(
                    'Succes!',
                    'Login succesfull, you will now be redirected'
                );
                this.router.navigate(['/']);
            })
            .catch((err) => {
                this.isLoggedIn = false;
                this.dialog.errorDialog(
                    'Error!',
                    'Login failed: ' + err.message
                );
            });
    }

    signup(email: string, password: string) {
        this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((value) => {
                this.dialog.succesDialog(
                    'Succes!',
                    'Signup succesfull, you will now be redirected'
                );
                this.router.navigate(['/']);
            })
            .catch((err) => {
                this.dialog.errorDialog(
                    'Error!',
                    'Signup failed: ' + err.message
                );
            });
    }

    logout() {
        this.afAuth.signOut().then(() => {
            this.isLoggedIn = false;
            this.isAdmin = false;
            this.loggedInUser = null;
            this.router.navigate(['/']);
        });
    }
}
