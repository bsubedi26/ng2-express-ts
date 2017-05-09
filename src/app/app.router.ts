import { RouterModule, Route } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

const routes: Route[] = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard'},
  { loadChildren: 'app/pages/dashboard/dashboard.module#DashboardModule', path: 'dashboard' },
  { loadChildren: 'app/pages/weather/weather.module#WeatherModule', path: 'weather' },
  { loadChildren: 'app/pages/login/login.module#LoginModule', path: 'login' },
  { loadChildren: 'app/pages/register/register.module#RegisterModule', path: 'register' },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(
  routes,
  {
    useHash: true
  }
);
