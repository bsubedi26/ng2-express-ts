import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { RegisterComponent } from './register.component';

const routes: Route[] = [
  {
    path: '',
    component: RegisterComponent
  }
];

export const routing: ModuleWithProviders = RouterModule.forChild(routes);
