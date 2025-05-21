import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { MainComponent } from './pages/main/main.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { MainTaskMangerComponent } from './components/pages/main/main-task-manger/main-task-manger.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', title: 'Home', component: HomeComponent },
  {
    path: 'main/:id',
    title: 'Main',
    component: MainComponent,
    children: [
      {
        path: 'main-task',
        title: 'TaskManger',
        component: MainTaskMangerComponent,
      },
    ],
  },

  {
    path: '**',
    title: '404 - Page not found',
    component: PageNotFoundComponent,
  },
];
