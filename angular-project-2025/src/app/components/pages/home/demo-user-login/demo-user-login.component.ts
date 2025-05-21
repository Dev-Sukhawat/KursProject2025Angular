import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface User {
  username: string;
  email: string;
  password: string;
}

@Component({
  selector: 'app-demo-user-login',
  standalone: true,
  imports: [CommonModule], // <-- Add this line
  templateUrl: './demo-user-login.component.html',
  styleUrls: ['./demo-user-login.component.scss'],
})
export class DemoUserLoginComponent implements OnInit {
  demoUsers: User[] = [];

  private localStorageKey = 'demoUsers';

  ngOnInit(): void {
    this.loadUsersFromLocalStorage();
  }

  loadUsersFromLocalStorage(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      this.demoUsers = JSON.parse(data);
    } else {
      // fallback: default users if localStorage is empty
      this.demoUsers = [
        {
          username: 'testuser',
          email: 'test@example.com',
          password: 'Password123!',
        },
        {
          username: 'Tasky',
          email: 'Tasky@Tasky.com',
          password: 'Tasky@2025',
        },
      ];
      localStorage.setItem(
        this.localStorageKey,
        JSON.stringify(this.demoUsers)
      );
    }
  }
}
