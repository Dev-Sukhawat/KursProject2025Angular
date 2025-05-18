import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  activeTeam = 'UX Design';

  teams = [
    { name: 'Management', color: 'red', count: 5 },
    { name: 'UX Design', color: 'purple', count: 4 },
    { name: 'Product Marketing', color: 'violet', count: 3 },
    { name: 'Analytics', color: 'blue', count: 5 },
  ];

  companyTeams = [
    { name: 'Development', color: 'green', count: 36 },
    { name: 'Sales', color: 'yellow', count: 3 },
  ];

  showAddForm = false;
  newTeamName = '';
  newTeamType: 'my' | 'company' = 'my';
  newTeamColor = 'gray'; // default

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.removeMode = false;
  }

  addTeam() {
    if (!this.newTeamName.trim()) return;

    const newTeam = {
      name: this.newTeamName.trim(),
      count: 1,
      color: this.newTeamColor,
    };

    if (this.newTeamType === 'my') {
      this.teams.push(newTeam);
    } else {
      this.companyTeams.push(newTeam);
    }

    // Reset and hide form
    this.showAddForm = false;
    this.newTeamName = '';
    this.newTeamColor = 'red';
    this.newTeamType = 'my';
  }

  removeMode = false;

  toggleRmForm() {
    this.removeMode = !this.removeMode;
    this.showAddForm = false;
  }

  removeTeamByName(name: string, type: 'my' | 'company') {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${name}"?`
    );
    if (!confirmed) return;
    if (type === 'my') {
      this.teams = this.teams.filter((team) => team.name !== name);
    } else {
      this.companyTeams = this.companyTeams.filter(
        (team) => team.name !== name
      );
    }
  }
}
