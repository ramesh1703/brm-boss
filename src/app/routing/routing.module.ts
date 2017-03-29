import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from '../login/login.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { QuickViewComponent } from '../dashboard/quick-view/quick-view.component';

const ROUTES: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login',  component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent,
  children: [
      { path: '', redirectTo: 'qview', pathMatch: 'full' },
      { path: 'qview', component: QuickViewComponent},
    ]}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(ROUTES)
  ],
  exports: [ RouterModule ],
  declarations: []
})
export class RoutingModule { }
