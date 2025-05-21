import { Component } from '@angular/core';
import { BackgroundLoginComponent } from '../../components/background-login/background-login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';
import { DemoUserLoginComponent } from '../../components/pages/home/demo-user-login/demo-user-login.component';

@Component({
  selector: 'app-home',
  imports: [
    BackgroundLoginComponent,
    LoginFormComponent,
    DemoUserLoginComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
