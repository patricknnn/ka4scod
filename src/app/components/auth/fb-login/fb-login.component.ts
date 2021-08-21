import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firestore/auth.service';

@Component({
    selector: 'app-fb-login',
    templateUrl: './fb-login.component.html',
    styleUrls: ['./fb-login.component.scss'],
})
export class FbLoginComponent {
    email = new FormControl('', [Validators.required]);
    password = new FormControl('', [Validators.required]);
    elevation: string = 'mat-elevation-z4';

    constructor(private auth: AuthService) {}

    login(): void {
        this.auth.login(this.email.value, this.password.value);
    }

    forgotPassword(): void {
        this.auth.sendPasswordResetEmail(this.email.value);
    }
}
