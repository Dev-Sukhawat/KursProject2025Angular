import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-task-manger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main-task-manger.component.html',
  styleUrl: './main-task-manger.component.scss',
})
export class MainTaskMangerComponent {
  columns: string[] = ['To Do', 'In Progress', 'Review', 'Done'];
}
