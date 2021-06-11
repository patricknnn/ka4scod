import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DialogService } from 'src/app/services/dialog.service';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  /**
   * Email form control
   */
  email = new FormControl('', [Validators.required]);
  /**
   * Password form control
   */
  password = new FormControl('', [Validators.required]);
  /**
   * Card elevation
   */
  elevation: string = 'mat-elevation-z4';
  /**
   * Initialize login component
   */
  constructor(
    private api: NodeRestApiService,
    private dialog: DialogService,
    private router: Router
  ) { }

  /**
   * Login to api
   */
  login(): void {
    this.api.login(this.email.value, this.password.value)
      .then((res) => {
        if (res == 'succes') {
          this.router.navigate([this.api.redirectUrl ? this.api.redirectUrl : '/dashboard'])
        } else {
          this.dialog.errorDialog('Error', res);
        };
      })
      .catch((err) => {
        this.dialog.errorDialog('Error', err);
      });
  }

}
