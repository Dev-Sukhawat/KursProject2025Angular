import { Component, Injectable, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
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

  username = signal('');
  email = signal('');
  password = signal('');
  demoUsers = signal<User[]>([
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
  ]);

  teams = [{ name: 'Demo', color: 'gray' }];

  get usernameModel() {
    return this.username();
  }
  set usernameModel(value: string) {
    this.username.set(value);
  }

  get emailModel() {
    return this.email();
  }
  set emailModel(value: string) {
    this.email.set(value);
  }

  get passwordModel() {
    return this.password();
  }
  set passwordModel(value: string) {
    this.password.set(value);
  }

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  saveUsers(): void {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.demoUsers()));
  }

  loadUsers(): void {
    const data = localStorage.getItem(this.localStorageKey);
    if (data) {
      this.demoUsers.set(JSON.parse(data));
    } else {
      this.saveUsers();
    }
  }

  addUser(user: User): void {
    this.demoUsers.update((users) => [...users, user]);
    this.saveUsers();
  }

  getUsers(): User[] {
    return this.demoUsers();
  }

  showUnderdevelopAlert(): void {
    alert('Underdevelop');
  }

  validateUsername(username: string): boolean {
    return /^[a-zA-Z0-9]{3,}$/.test(username);
  }

  validateEmail(email: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  validatePassword(password: string): boolean {
    const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return re.test(password);
  }

  handleLogin(): void {
    this.loadUsers();

    if (!this.validateUsername(this.username())) {
      alert('Invalid username! Must be at least 3 characters, letters and numbers only.');
      return;
    }
    if (!this.validateEmail(this.email())) {
      alert('Invalid email format!');
      return;
    }
    if (!this.validatePassword(this.password())) {
      alert('Invalid password! Minimum 8 characters, with uppercase, lowercase, number, and special character.');
      return;
    }

    const user = this.demoUsers().find(
      (u) =>
        u.username === this.username() &&
        u.email === this.email() &&
        u.password === this.password()
    );

    if (!user) {
      alert('User not found or credentials incorrect.');
      return;
    }

    const teamsData = localStorage.getItem('allTeams');
    let teamName: string = 'Demo';

    if (teamsData) {
      const allTeams = JSON.parse(teamsData);
      const demoExists = allTeams.myTeams.some((t: any) => t.name === 'Demo');

      if (demoExists) {
        teamName = 'Demo';
      } else if (allTeams.myTeams.length > 0) {
        teamName = allTeams.myTeams[0].name;
      } else if (allTeams.companyTeams.length > 0) {
        teamName = allTeams.companyTeams[0].name;
      }
    }

    const teamParam = teamName.toLowerCase().replace(/\s+/g, '-');

    alert('Login success!');

    this.router.navigate(['/main', user.username], {
      queryParams: { team: teamParam },
      fragment: 'tasks',
    });
  }
}