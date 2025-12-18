import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'extensions',
    loadComponent: () =>
      import('./extensions/extensions').then((c) => c.Extensions),
  },
  {
    path: '**',
    redirectTo: 'extensions',
    pathMatch: 'full',
  },
];
