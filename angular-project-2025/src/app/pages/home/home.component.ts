import { Component } from '@angular/core';
import { BackgroundLoginComponent } from '../../components/background-login/background-login.component';
import { LoginFormComponent } from '../../components/login-form/login-form.component';

@Component({
  selector: 'app-home',
  imports: [BackgroundLoginComponent, LoginFormComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
