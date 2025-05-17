import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
// import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  standalone: true, // ✅ REQUIRED for standalone components
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Tasky';
}

