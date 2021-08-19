import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from '../dialog.service';
import { User } from 'src/app/models/user';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    loggedInUser: User | null = null;

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private dialog: DialogService
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.setUserData(user);
                this.router.navigate(['/']);
            } else {
                this.loggedInUser = null;
            }
        });
    }

    get isLoggedIn(): boolean {
        return this.loggedInUser !== null;
    }

    get isAdmin(): boolean {
        return (
            this.loggedInUser !== null &&
            this.loggedInUser.uid == 'YTHqdekzOpON2Y0ggO2Uly8bmKC2'
        );
    }

    login(email: string, password: string): void {
        this.afAuth
            .signInWithEmailAndPassword(email, password)
            .then((value) => {
                this.setUserData(value.user);
            })
            .catch((err) => {
                this.dialog.errorDialog('Login failed', err.message);
            });
    }

    signup(email: string, password: string): void {
        this.afAuth
            .createUserWithEmailAndPassword(email, password)
            .then((value) => {
                this.sendVerificationMail();
                this.setUserData(value.user);
                this.dialog.succesDialog(
                    'Signup succesfull',
                    'Please check your inbox to verify your email'
                );
                this.router.navigate(['/']);
            })
            .catch((err) => {
                this.dialog.errorDialog('Signup failed', err.message);
            });
    }

    sendVerificationMail() {
        return this.afAuth.currentUser.then((user) => {
            user?.sendEmailVerification();
        });
    }

    logout(): void {
        this.afAuth.signOut().then(() => {
            window.location.reload();
        });
    }

    setUserData(user: any): void {
        const userData: User = {
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
            emailVerified: user.emailVerified,
        };
        this.loggedInUser = userData;
    }
}
