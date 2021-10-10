import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/firestore/auth.service';

@Component({
    selector: 'app-fb-register',
    templateUrl: './fb-register.component.html',
    styleUrls: ['./fb-register.component.scss'],
})
export class FbRegisterComponent {
    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required]);
    elevation: string = 'mat-elevation-z4';

    constructor(private auth: AuthService) {}

    register(): void {
        this.auth.signup(this.email.value, this.password.value);
    }

    isFormValid(): boolean {
        return this.email.valid && this.password.valid;
    }
}
