import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CapitalizePipe } from '../../../utils/capitalize.pipe';
import { Observable, switchMap, of } from 'rxjs';
import { TeamFormService } from '../../../../team-form.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { TaskTitleDialogComponent } from '../task-title-dialog/task-title-dialog.component';

// ✅ Lägg interface UTANFÖR @Component
interface Task {
  id: string;
  title: string;
  nameCard?: string;
}

interface Column {
  name: string;
  tasks: Task[];
  color: string;
  progress: number;
  cardName: string;
}

@Component({
  selector: 'app-main-task-manger',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    CapitalizePipe,
    DragDropModule,
    ProgressBarComponent,
  ],
  templateUrl: './main-task-manger.component.html',
  styleUrls: ['./main-task-manger.component.scss'],
})
export class MainTaskMangerComponent implements OnInit {
  selectedTeam: string | null = null;
  currentFragment: string | null = null;
  taskCounter: number = 6;
  connectedDropListsIds: string[] = [];
  removeMode = false;

  columns: Column[] = [];

  constructor(
    private route: ActivatedRoute,
    public teamFormService: TeamFormService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const teamParam = params['team'];
      if (teamParam) {
        this.loadTeamFromParam(teamParam);
      }
    });
  }

  loadTeamFromParam(teamParam: string): void {
    const savedTeams = localStorage.getItem('allTeams');
    if (!savedTeams) {
      console.warn('No data found in localStorage');
      return;
    }

    const allTeams = JSON.parse(savedTeams);
    const myTeams = allTeams.myTeams || [];
    const companyTeams = allTeams.companyTeams || [];

    // Kombinera alla team i en lista för att söka i båda kategorierna
    const all = [...myTeams, ...companyTeams];

    // Leta upp teamet med sluggat namn (lowercase, spaces till '-')
    const matchedTeam = all.find(
      (team) => team.name.toLowerCase().replace(/\s+/g, '-') === teamParam
    );

    if (!matchedTeam) {
      console.warn(`Team med slug "${teamParam}" hittades inte.`);
      return;
    }

    this.columns = matchedTeam.columns || [];
    this.connectedDropListsIds = this.columns.map(
      (_, i) => `cdk-drop-list-${i}`
    );
    this.selectedTeam = matchedTeam.name;

    // Räkna ut totala antalet tasks i alla kolumner
    const allTaskCount = this.columns.flatMap((column) => column.tasks).length;
    this.taskCounter = allTaskCount > 0 ? allTaskCount + 1 : 1;
  }

  addCardMode(column: Column): void {
    this.removeMode = false;
    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      width: '300px',
      data: { title: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: Task = {
          id: `ID-00${this.taskCounter++}`,
          title: result,
        };
        column.tasks.push(newTask);
        this.updateCardNames();
        this.saveTeamToLocalStorage();
      }
    });
  }

  editCardMode(column: Column, task: Task): void {
    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      width: '300px',
      data: { title: task.title },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        task.title = result;
        this.updateCardNames();
        this.saveTeamToLocalStorage();
      }
    });
  }

  removeSpecificCard(column: Column, taskToRemove: Task): void {
    column.tasks = column.tasks.filter((task) => task !== taskToRemove);
    this.updateCardNames();
    this.saveTeamToLocalStorage();
  }

  toggleRemoveMode() {
    this.removeMode = !this.removeMode;
  }

  drop(event: CdkDragDrop<Task[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
    this.updateCardNames();
    this.saveTeamToLocalStorage();
  }

  updateCardNames() {
    this.columns.forEach((column) => {
      let prefix = '';
      switch (column.name) {
        case 'To Do':
          prefix = 'TD';
          break;
        case 'In Progress':
          prefix = 'IP';
          break;
        case 'Review':
          prefix = 'RW';
          break;
        case 'Done':
          prefix = 'DN';
          break;
        default:
          prefix = 'XX';
      }
      column.cardName = prefix;
      column.tasks.forEach((task, index) => {
        task.nameCard = `${prefix}-${index + 1}`;
      });
    });
  }

  saveTeamToLocalStorage() {
    const storedTeams = localStorage.getItem('allTeams');
    if (!storedTeams || !this.selectedTeam || !this.currentFragment) return;

    const allTeams = JSON.parse(storedTeams);
    const teamListKey =
      this.currentFragment === 'company' ? 'companyTeams' : 'myTeams';
    const teams = allTeams[teamListKey];

    const teamIndex = teams.findIndex((t: any) => t.name === this.selectedTeam);
    if (teamIndex === -1) return;

    teams[teamIndex].columns = this.columns;

    localStorage.setItem('allTeams', JSON.stringify(allTeams));
  }
}