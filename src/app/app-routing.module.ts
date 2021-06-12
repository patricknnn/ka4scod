import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/api/login/login.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { EditPlayerComponent } from './components/firestore/edit-player/edit-player.component';
import { EditVideoComponent } from './components/firestore/edit-video/edit-video.component';
import { ViewPlayersComponent } from './components/firestore/view-players/view-players.component';
import { ViewVideosComponent } from './components/firestore/view-videos/view-videos.component';
import { KillsTableComponent } from './components/tables/kills-table/kills-table.component';
import { StatsMpTableComponent } from './components/tables/stats-mp-table/stats-mp-table.component';
import { StatsWzTableComponent } from './components/tables/stats-wz-table/stats-wz-table.component';

const routes: Routes = [
  // Paths
  { path: 'login', component: LoginComponent },
  // general
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'playground', component: PlaygroundComponent, canActivate: [AuthGuard] },
  { path: 'players', component: ViewPlayersComponent, canActivate: [AuthGuard] },
  { path: 'player', component: EditPlayerComponent, canActivate: [AuthGuard] },
  { path: 'videos', component: ViewVideosComponent, canActivate: [AuthGuard] },
  { path: 'video', component: EditVideoComponent, canActivate: [AuthGuard] },
  { path: '404', component: PageNotFoundComponent },
  // mp
  { path: 'statsmp', component: StatsMpTableComponent, canActivate: [AuthGuard] },
  { path: 'kills', component: KillsTableComponent, canActivate: [AuthGuard] },
  // wz
  { path: 'statswz', component: StatsWzTableComponent, canActivate: [AuthGuard] },
  // Redirects
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: '404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
