import { Component, Injectable, OnInit } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent implements OnInit {
  private localStorageKey = 'demoUsers';
  username: string = '';
  email: string = '';
  password: string = '';

  // Demo users list
  demoUsers: User[] = [
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

  constructor(private router: Router) {}

  saveUsers(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.demoUsers));
  }
  ngOnInit(): void {
    this.loadUsers(); // Ladda användare från localStorage vid start
  }

  loadUsers(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      this.demoUsers = JSON.parse(data);
    } else {
      this.saveUsers(); // spara default om inget finns
    }
  }

  // (valfritt) Lägg till användare
  addUser(user: User): void {
    this.demoUsers.push(user);
    this.saveUsers();
  }

  // (valfritt) Hämta alla
  getUsers(): User[] {
    return this.demoUsers;
  }

  showUnderdevelopAlert(): void {
    alert('Underdevelop');
  }

  // Validate username: letters and numbers, min 3 chars
  validateUsername(username: string): boolean {
    return /^[a-zA-Z0-9]{3,}$/.test(username);
  }

  // Validate email format
  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  // Validate password: min 8 chars, uppercase, lowercase, number, special char
  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  }

  handleLogin(): void {
    this.loadUsers(); // 👈 hämta uppdaterad lista från localStorage
    if (!this.validateUsername(this.username)) {
      alert(
        'Invalid username! Must be at least 3 characters, letters and numbers only.'
      );
      return;
    }
    if (!this.validateEmail(this.email)) {
      alert('Invalid email format!');
      return;
    }
    if (!this.validatePassword(this.password)) {
      alert(
        'Invalid password! Minimum 8 characters, with uppercase, lowercase, number, and special character.'
      );
      return;
    }

    const user = this.demoUsers.find(
      (u) =>
        u.username === this.username &&
        u.email === this.email &&
        u.password === this.password
    );

    console.log(user);

    if (user) {
      alert('Login successful!');
      this.router.navigate(['/main', user.username]); // 👈 navigera om korrekt
    } else {
      alert('User not found or wrong credentials.');
    }
  }
}
