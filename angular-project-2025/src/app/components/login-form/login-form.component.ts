import { Component } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface User {
  username: string;
  email: string;
  password: string;
}
@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login-form.component.html',
  styleUrl: './login-form.component.scss',
})
export class LoginFormComponent {
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
      username: 'johndoe',
      email: 'john.doe@example.com',
      password: 'JohnDoe@2025',
    },
  ];

  constructor(private router: Router) {}

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

    if (user) {
      alert('Login successful!');
      this.router.navigate(['/main-component']);
    } else {
      alert('User not found or wrong credentials.');
    }
  }
}
