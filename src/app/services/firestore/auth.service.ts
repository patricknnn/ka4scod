import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { DialogService } from '../dialog.service';
import { User } from 'src/app/models/user';
import { UserService } from './user.service';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    redirectUrl?: string;
    loggedInUser: User | null = null;
    admins: Array<string> = ['YTHqdekzOpON2Y0ggO2Uly8bmKC2'];

    constructor(
        private afAuth: AngularFireAuth,
        private router: Router,
        private user: UserService,
        private dialog: DialogService
    ) {
        this.afAuth.authState.subscribe((user) => {
            if (user) {
                this.setUserData(user);
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
            this.admins.includes(this.loggedInUser.uid!)
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

    sendPasswordResetEmail(passwordResetEmail: string) {
        return this.afAuth
            .sendPasswordResetEmail(passwordResetEmail)
            .then(() => {
                this.dialog.succesDialog(
                    'Password reset succesfull',
                    'Please check your inbox for further instructions'
                );
            })
            .catch((err) => {
                this.dialog.errorDialog('Password reset failed', err.message);
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
            emailVerified: user.emailVerified,
        };
        this.user.write(userData);
        this.user
            .getByKey(user.uid)
            .snapshotChanges()
            .pipe(map((c) => ({ key: c.payload.id, ...c.payload.data() })))
            .subscribe((data) => {
                this.loggedInUser = data;
            });
        this.router.navigate(['/']);
    }
}
