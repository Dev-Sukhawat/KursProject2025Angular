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

  allTeams = {
    myTeams: [
      {
        name: 'Demo',
        color: 'gray',
        count: 1,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [
              { id: 'ID-001', title: 'Feed the dog', deadline: '12-07-2025' },
              {
                id: 'ID-002',
                title: 'Take a walk with the dog',
                deadline: '10-06-2025',
              },
            ],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [
              { id: 'ID-003', title: 'Drive home', deadline: '30-08-2025' },
            ],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [
              { id: 'ID-004', title: 'Refuel the car', deadline: '12-05-2025' },
            ],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [
              { id: 'ID-005', title: 'Company Work', deadline: '29-06-2025' },
            ],
          },
        ],
      },
      {
        name: 'Management',
        color: 'red',
        count: 5,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [
              { id: 'ID-001', title: 'Feed the dog', deadline: '30-05-2025' },
              {
                id: 'ID-002',
                title: 'Take a walk with the dog',
                deadline: '30-05-2025',
              },
              { id: 'ID-003', title: 'Drive home', deadline: '30-05-2025' },
              { id: 'ID-004', title: 'Refuel the car', deadline: '30-05-2025' },
              { id: 'ID-005', title: 'Company Work', deadline: '30-05-2025' },
            ],
          },
        ],
      },
      {
        name: 'UX Design',
        color: 'purple',
        count: 4,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [
              { id: 'ID-001', title: 'Feed the dog', deadline: 'Anytime' },
              {
                id: 'ID-002',
                title: 'Take a walk with the dog',
                deadline: '30-07-2025',
              },
              { id: 'ID-003', title: 'Drive home', deadline: '30-07-2025' },
            ],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [
              { id: 'ID-004', title: 'Refuel the car', deadline: '31-05-2025' },
            ],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [
              { id: 'ID-005', title: 'Company Work', deadline: '30-05-2025' },
            ],
          },
        ],
      },
      {
        name: 'Product Marketing',
        color: 'violet',
        count: 3,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [
              { id: 'ID-001', title: 'Feed the dog', deadline: '30-08-2025' },
              {
                id: 'ID-002',
                title: 'Take a walk with the dog',
                deadline: '30-08-2025',
              },
              { id: 'ID-003', title: 'Drive home', deadline: '30-08-2025' },
            ],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [],
          },
        ],
      },
      {
        name: 'Analytics',
        color: 'blue',
        count: 5,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [],
          },
        ],
      },
    ],
    companyTeams: [
      {
        name: 'Development',
        color: 'green',
        count: 36,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [],
          },
        ],
      },
      {
        name: 'Sales',
        color: 'yellow',
        count: 3,
        columns: [
          {
            name: 'To Do',
            color: '#aaa',
            cardName: '',
            progress: 3,
            tasks: [],
          },
          {
            name: 'In Progress',
            color: '#ff0000',
            cardName: '',
            progress: 33,
            tasks: [],
          },
          {
            name: 'Review',
            color: '#ffcc00',
            cardName: '',
            progress: 66,
            tasks: [],
          },
          {
            name: 'Done',
            color: '#00cc66',
            cardName: '',
            progress: 100,
            tasks: [],
          },
        ],
      },
    ],
  };

  saveAllTeamsToStorage() {
    localStorage.setItem('allTeams', JSON.stringify(this.allTeams));
  }

  loadAllTeamsFromStorage() {
    const data = localStorage.getItem('allTeams');
    if (data) {
      this.allTeams = JSON.parse(data);
    } else {
      this.saveAllTeamsToStorage(); // spara standard första gången
    }
  }

  ngOnInit(): void {
    this.loadAllTeamsFromStorage();

    if (this.allTeams.myTeams.length > 0) {
      this.activeTeam = this.allTeams.myTeams[0].name;
    } else if (this.allTeams.companyTeams.length > 0) {
      this.activeTeam = this.allTeams.companyTeams[0].name;
    }
  }

  addTeam() {
    const form = this.teamFormService;
    if (!form.newTeamName.trim()) return;

    const newTeam = {
      name: form.newTeamName.trim(),
      count: 1,
      color: form.newTeamColor,
      columns: [
        {
          name: 'To Do',
          color: '#aaa',
          cardName: '',
          progress: 3,
          tasks: [],
        },
        {
          name: 'In Progress',
          color: '#ff0000',
          cardName: '',
          progress: 33,
          tasks: [],
        },
        {
          name: 'Review',
          color: '#ffcc00',
          cardName: '',
          progress: 66,
          tasks: [],
        },
        {
          name: 'Done',
          color: '#00cc66',
          cardName: '',
          progress: 100,
          tasks: [],
        },
      ],
    };

    if (form.newTeamType === 'my') {
      this.allTeams.myTeams.push(newTeam);
    } else {
      this.allTeams.companyTeams.push(newTeam);
    }

    form.showAddForm = false;
    form.resetForm();
    this.saveAllTeamsToStorage();
  }

  removeTeamByName(name: string, type: 'my' | 'company') {
    const confirmed = window.confirm(
      `Are you sure you want to remove "${name}"?`
    );
    if (!confirmed) return;

    if (type === 'my') {
      this.allTeams.myTeams = this.allTeams.myTeams.filter(
        (team) => team.name !== name
      );
    } else {
      this.allTeams.companyTeams = this.allTeams.companyTeams.filter(
        (team) => team.name !== name
      );
    }

    this.saveAllTeamsToStorage();
  }

  selectTeam(teamName: string, type: 'my' | 'company') {
    this.activeTeam = teamName;

    const teamParam = teamName.toLowerCase().replace(/\s+/g, '-');

    this.router.navigate(['/main', this.LoginId], {
      queryParams: { team: teamParam },
      fragment: 'tasks',
    });
  }
}
