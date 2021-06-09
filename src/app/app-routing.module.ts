import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';

const routes: Routes = [
  // Paths
  { path: 'apiplayground', component: PlaygroundComponent },
  { path: '404', component: PageNotFoundComponent },
  // Redirects
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
