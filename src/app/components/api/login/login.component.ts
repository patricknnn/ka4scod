import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
    sso = new FormControl('', [Validators.required]);
    elevation: string = 'mat-elevation-z4';

    constructor(
        private api: NodeRestApiService,
        private dialog: DialogService,
        private router: Router
    ) {}

    login(): void {
        this.api
            .login(this.sso.value)
            .then((res) => {
                console.log(res);
                if (res == 'succes') {
                    this.router.navigate([
                        this.api.redirectUrl
                            ? this.api.redirectUrl
                            : '/dashboard',
                    ]);
                } else {
                    this.dialog.errorDialog('Error', res);
                }
            })
            .catch((err) => {
                this.dialog.errorDialog('Error', err);
            });
    }
}
