import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CapitalizePipe } from '../../../utils/capitalize.pipe';
import { TeamFormService } from '../../../../team-form.service';
import {
  CdkDragDrop,
  DragDropModule,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { ProgressBarComponent } from '../progress-bar/progress-bar.component';
import { TaskTitleDialogComponent } from '../task-title-dialog/task-title-dialog.component';

interface Task {
  id: string;
  title: string;
  nameCard?: string;
  deadline: string;
}

interface Column {
  name: string;
  tasks: Task[];
  color: string;
  progress: number;
  cardName: string;
}

interface Team {
  name: string;
  color?: string;
  count?: number;
  columns: Column[];
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
  currentTeamParam: string = '';
  taskCounter: number = 6;
  connectedDropListsIds: string[] = [];
  removeMode = false;

  columns: Column[] = [];
  sortedDeadlines: any;

  constructor(
    private route: ActivatedRoute,
    public teamFormService: TeamFormService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const teamParam = params['team'];
      // console.log(teamParam);
      if (teamParam) {
        this.loadTeamFromParam(teamParam);
      }
    });
  }

  loadTeamFromParam(teamParam: string): void {
    this.currentTeamParam = teamParam;
    const savedTeams = localStorage.getItem('allTeams');
    if (!savedTeams) {
      console.warn('No data found in localStorage');
      return;
    }

    const allTeams = JSON.parse(savedTeams);
    const myTeams: Team[] = allTeams.myTeams || [];
    const companyTeams: Team[] = allTeams.companyTeams || [];

    const all: Team[] = [...myTeams, ...companyTeams];

    const matchedTeam = all.find(
      (team) => team.name.toLowerCase().replace(/\s+/g, '-') === teamParam
    );

    if (!matchedTeam) {
      console.warn(`Team with slug "${teamParam}" not found.`);
      return;
    }

    this.columns = matchedTeam.columns || [];
    this.connectedDropListsIds = this.columns.map(
      (_, i) => `cdk-drop-list-${i}`
    );
    this.selectedTeam = matchedTeam.name;

    this.currentFragment = myTeams.some(
      (team) => team.name === matchedTeam.name
    )
      ? 'myTeams'
      : 'companyTeams';

    const allTaskCount = this.columns.flatMap((column) => column.tasks).length;
    this.taskCounter = allTaskCount > 0 ? allTaskCount + 1 : 1;

    // console.log('✔️ Loaded team:', this.selectedTeam);
    // console.log('➡️ currentFragment:', this.currentFragment);
  }

  addCardMode(clickedColumn: Column): void {
    this.removeMode = false;

    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      width: '300px',
      data: { title: '', deadline: '' },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newTask: Task = {
          id: `ID-00${this.taskCounter++}`,
          title: result.title,
          deadline: result.deadline,
        };
        const column = this.columns.find((c) => c.name === clickedColumn.name);
        if (!column) return;

        column.tasks.push(newTask);
        this.updateCardNames();
        this.saveTeamToLocalStorage();
      }
    });
  }

  editCardMode(column: Column, task: Task): void {
    const dialogRef = this.dialog.open(TaskTitleDialogComponent, {
      width: '300px',
      data: { title: task.title, deadline: task.deadline },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        task.title = result.title;
        task.deadline = result.deadline;
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
    console.log(teams);

    const teamIndex = teams.findIndex((t: any) => t.name === this.selectedTeam);
    if (teamIndex === -1) {
      console.warn('Team not found in localStorage');
      return;
    }

    teams[teamIndex].columns = this.columns;

    // console.log('Before saving:', JSON.stringify(allTeams, null, 2));

    localStorage.setItem('allTeams', JSON.stringify(allTeams));

    const check = localStorage.getItem('allTeams');
    // console.log('After saving:', check);
  }

  isFilteringDeadlines: boolean = false;

  loadOriginalData(): void {
    if (this.currentTeamParam) {
      this.loadTeamFromParam(this.currentTeamParam);
    }
  }

  toggleDeadlineFilter() {
    this.isFilteringDeadlines = !this.isFilteringDeadlines;

    if (this.isFilteringDeadlines) {
      this.filterByDeadline();
    } else {
      this.loadOriginalData();
    }
  }

  filterByDeadline() {
    const storedTeams = localStorage.getItem('allTeams');
    if (!storedTeams || !this.selectedTeam || !this.currentFragment) return;

    const allTeams = JSON.parse(storedTeams);
    const teamListKey =
      this.currentFragment === 'company' ? 'companyTeams' : 'myTeams';
    const teams = allTeams[teamListKey];

    const teamIndex = teams.findIndex((d: any) => d.name === this.selectedTeam);
    if (teamIndex === -1) return;

    const columns = teams[teamIndex].columns;

    // Filtre tasks white deadline
    const filteredColumns = columns.map((col: any) => {
      const validDateTasks: any[] = [];
      const anytimeOrInvalidTasks: any[] = [];

      col.tasks.forEach((task: any) => {
        const deadlineStr = task.deadline?.toLowerCase().trim();

        if (!deadlineStr || deadlineStr === 'anytime') {
          anytimeOrInvalidTasks.push(task);
          return;
        }

        const parts = deadlineStr.split('-');
        if (parts.length === 3) {
          const [day, month, year] = parts.map(Number);
          const parsedDate = new Date(year, month - 1, day);
          if (!isNaN(parsedDate.getTime())) {
            validDateTasks.push({ ...task, parsedDeadline: parsedDate });
            return;
          }
        }

        // If parsing fails, treat as invalid and push to the end
        anytimeOrInvalidTasks.push(task);
      });

      // Sort only valid date tasks
      validDateTasks.sort((a, b) => a.parsedDeadline - b.parsedDeadline);

      // Remove `parsedDeadline` before display

      const cleanedValidTasks = validDateTasks.map(
        ({ parsedDeadline, ...rest }) => rest
      );

      return {
        ...col,
        tasks: [...cleanedValidTasks, ...anytimeOrInvalidTasks],
      };
    });

    this.columns = filteredColumns;
  }
}