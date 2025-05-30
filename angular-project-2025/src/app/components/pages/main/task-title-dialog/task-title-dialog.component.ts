import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-title-dialog',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './task-title-dialog.component.html',
  styleUrls: ['./task-title-dialog.component.scss'], // fixat från "styleUrl"
})
export class TaskTitleDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<TaskTitleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; deadline: string }
  ) {}
}
