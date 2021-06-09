import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { NodeRestApiService } from 'src/app/services/node-rest-api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  constructor(private api: NodeRestApiService) { }

  ngOnInit(): void {
  }

  login(): void {
    this.api.login(this.email.value, this.password.value);
  }

}
