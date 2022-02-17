import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {
  DashboardComponent,
  CustomersComponent,
  NotificationsComponent,
} from './pages';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'notifications', component: NotificationsComponent },
  { path: 'keys', component: CustomersComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
