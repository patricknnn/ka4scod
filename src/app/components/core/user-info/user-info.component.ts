import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/firestore/auth.service';

@Component({
    selector: 'app-user-info',
    templateUrl: './user-info.component.html',
    styleUrls: ['./user-info.component.scss'],
})
export class UserInfoComponent {
    constructor(private router: Router, private auth: AuthService) {}

    isLoggedIn(): boolean {
        return this.auth.isLoggedIn;
    }

    loggedInUser(): User | null {
        return this.auth.loggedInUser;
    }

    displayName(): string {
        return this.auth.loggedInUser?.displayName || 'Username';
    }

    email(): string {
        return this.auth.loggedInUser?.email || 'email';
    }

    avatar(): string {
        return (
            this.auth.loggedInUser?.photoURL ||
            'https://static.vecteezy.com/system/resources/previews/002/275/847/original/male-avatar-profile-icon-of-smiling-caucasian-man-vector.jpg'
        );
    }

    logout(): void {
        this.auth.logout();
    }
}
