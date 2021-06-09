import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/api/login/login.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';

const routes: Routes = [
  // Paths
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
  { path: 'apiplayground', component: PlaygroundComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  // Redirects
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
