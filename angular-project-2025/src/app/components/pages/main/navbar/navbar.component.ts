import { Router } from '@angular/router';
import { Component, Input, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TeamFormService } from '../../../../team-form.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  @Input() LoginId!: string | null;
  activeTeam = '';

  constructor(
    private router: Router,
    public teamFormService: TeamFormService
  ) {}

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

  ngOnInit(): void {
    if (this.teams.length > 0) {
      this.activeTeam = this.teams[0].name;
    } else if (this.companyTeams.length > 0) {
      this.activeTeam = this.companyTeams[0].name;
    }
  }

  addTeam() {
    const form = this.teamFormService;
    if (!form.newTeamName.trim()) return;

    const newTeam = {
      name: form.newTeamName.trim(),
      count: 1,
      color: form.newTeamColor,
    };

    if (form.newTeamType === 'my') {
      this.teams.push(newTeam);
    } else {
      this.companyTeams.push(newTeam);
    }

    // Reset and hide form
    form.showAddForm = false;
    form.resetForm();
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

  selectTeam(teamName: string, type: 'my' | 'company') {
    this.activeTeam = teamName;

    const teamParam = teamName.toLowerCase().replace(/\s+/g, '-'); // e.g. UX Design → ux-design

    this.router.navigate(['/main', this.LoginId], {
      queryParams: { team: teamParam },
      fragment: 'tasks',
    });
  }
}
