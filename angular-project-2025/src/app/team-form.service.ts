import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TeamFormService {
  showAddForm = false;
  removeMode = false;
  newTeamName = '';
  newTeamType: 'my' | 'company' = 'my';
  newTeamColor = 'gray';

  toggleAddForm() {
    this.showAddForm = !this.showAddForm;
    this.removeMode = false;
  }

  toggleRmForm() {
    this.removeMode = !this.removeMode;
    this.showAddForm = false;
  }

  resetForm() {
    this.newTeamName = '';
    this.newTeamType = 'my';
    this.newTeamColor = 'gray';
  }
}
