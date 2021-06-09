import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  email = new FormControl('patrickniewold@gmail.com', [Validators.required]);
  /**
   * Password form control
   */
  password = new FormControl('', [Validators.required]);

  /**
   * Initialize login component
   */
  constructor(
    private api: NodeRestApiService,
    private router: Router
  ) { }

  /**
   * Login to api
   */
  login(): void {
    this.api.login(this.email.value, this.password.value).then((res) => {
      if (res == 'succes') this.router.navigate(['/apiplayground']);
    });
  }

}
