import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable, switchMap } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-main-task-manger',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './main-task-manger.component.html',
  styleUrl: './main-task-manger.component.scss',
})
export class MainTaskMangerComponent {
  columns: string[] = ['To Do', 'In Progress', 'Review', 'Done'];
  id: number = 0;
  idObs: Observable<number>;

  // constructor(private router: ActivatedRoute) {
  //   this.idObs = this.router.paramMap.pipe(switchMap((params) => {
  //     this.id = Number(params.get('id'));
  //     return this.id;
  //   }))
  constructor(private router: ActivatedRoute) {
  this.idObs = this.router.paramMap.pipe(switchMap((params) => {
    this.id = Number(params.get('id'));
    return of(this.id); // ✅ Wrap the number in an Observable
  }));
  }
}
