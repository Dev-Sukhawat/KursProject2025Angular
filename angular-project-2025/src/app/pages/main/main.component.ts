import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterLinkWithHref, RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../components/pages/main/navbar/navbar.component';
import { TopBarComponent } from '../../components/pages/main/top-bar/top-bar.component';
import { MainTaskMangerComponent } from '../../components/pages/main/main-task-manger/main-task-manger.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    NavbarComponent,
    TopBarComponent,
    MainTaskMangerComponent,
    RouterOutlet,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent implements OnInit {
  LoginId!: string | null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.LoginId = params.get('id');
      // console.log('LoginId:', this.LoginId);
    });
  }
}
