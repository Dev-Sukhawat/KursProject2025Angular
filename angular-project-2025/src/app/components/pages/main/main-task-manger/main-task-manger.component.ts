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

  constructor(
    private route: ActivatedRoute,
    public teamFormService: TeamFormService,
    private dialog: MatDialog
  ) {}
  connectedDropListsIds: string[] = [];

  taskCounter = 6;

  columns: Column[] = [
    {
      name: 'To Do',
      color: '#aaa',
      cardName: '',
      progress: 3,
      tasks: [
        { id: 'ID-001', title: 'Feed the dog' },
        { id: 'ID-002', title: 'Take a walk with the dog' },
      ],
    },
    {
      name: 'In Progress',
      color: '#ff0000',
      cardName: '',
      progress: 33,
      tasks: [{ id: 'ID-003', title: 'Drive home' }],
    },
    {
      name: 'Review',
      color: '#ffcc00',
      cardName: '',
      progress: 66,
      tasks: [{ id: 'ID-004', title: 'Refuel the car' }],
    },
    {
      name: 'Done',
      color: '#00cc66',
      cardName: '',
      progress: 100,
      tasks: [{ id: 'ID-005', title: 'Company Work' }],
    },
  ];

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.selectedTeam = params.get('team');
    });

    this.route.fragment.subscribe((fragment) => {
      this.currentFragment = fragment;
    });

    // Initiera listan med drop-list IDs efter kolumnerna är definierade
    this.connectedDropListsIds = this.columns.map(
      (_, index) => 'cdk-drop-list-' + index
    );

    // Sätt cardName och nameCard baserat på tasks.length
    this.columns.forEach((column) => {
      let prefix = '';

      if (column.name === 'To Do') {
        prefix = 'TD';
      } else if (column.name === 'In Progress') {
        prefix = 'IP';
      } else if (column.name === 'Review') {
        prefix = 'RW';
      } else if (column.name === 'Done') {
        prefix = 'DN';
      } else {
        prefix = 'XX';
      }

      // Sätt unika namn för varje task baserat på index
      column.tasks.forEach((task, index) => {
        task.nameCard = `${prefix}-${index + 1}`;
      });
    });
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
        this.updateCardNames(); // ev. uppdateringslogik
      }
    });
  }

  removeSpecificCard(column: Column, taskToRemove: Task): void {
    column.tasks = column.tasks.filter((task) => task !== taskToRemove);
    this.updateCardNames();
  }

  removeMode = false;

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

      // Valfritt: sätt kolumnens cardName till prefix (utan nummer)
      column.cardName = prefix;

      // Ge varje task ett unikt nameCard
      column.tasks.forEach((task, index) => {
        task.nameCard = `${prefix}-${index + 1}`;
      });
    });
  }
}
