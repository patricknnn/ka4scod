import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './components/api/login/login.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { FbLoginComponent } from './components/auth/fb-login/fb-login.component';
import { FbRegisterComponent } from './components/auth/fb-register/fb-register.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { ProfileComponent } from './components/core/profile/profile.component';
import { DetailEventComponent } from './components/firestore/detail-event/detail-event.component';
import { EditEventComponent } from './components/firestore/edit-event/edit-event.component';
import { EditPlayerComponent } from './components/firestore/edit-player/edit-player.component';
import { EditVideoComponent } from './components/firestore/edit-video/edit-video.component';
import { ViewEventsComponent } from './components/firestore/view-events/view-events.component';
import { ViewPlayersComponent } from './components/firestore/view-players/view-players.component';
import { ViewVideosComponent } from './components/firestore/view-videos/view-videos.component';
import { KillsTableComponent } from './components/tables/kills-table/kills-table.component';
import { PlayerTableComponent } from './components/tables/player-table/player-table.component';
import { StatsLifetimeWzComponent } from './components/tables/stats-lifetime-wz/stats-lifetime-wz.component';
import { StatsLifetimeComponent } from './components/tables/stats-lifetime/stats-lifetime.component';
import { StatsMpTableComponent } from './components/tables/stats-mp-table/stats-mp-table.component';
import { StatsWeeklyComponent } from './components/tables/stats-weekly/stats-weekly.component';
import { StatsWzTableComponent } from './components/tables/stats-wz-table/stats-wz-table.component';

const routes: Routes = [
    // login
    { path: 'fb-login', component: FbLoginComponent },
    { path: 'fb-register', component: FbRegisterComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
    // general
    {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'playground',
        component: PlaygroundComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'players',
        component: ViewPlayersComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'player',
        component: EditPlayerComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'playerstats',
        component: PlayerTableComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'videos',
        component: ViewVideosComponent,
        canActivate: [AuthGuard],
    },
    { path: 'video', component: EditVideoComponent, canActivate: [AuthGuard] },
    {
        path: 'events',
        component: ViewEventsComponent,
        canActivate: [AuthGuard],
    },
    { path: 'event', component: EditEventComponent, canActivate: [AuthGuard] },
    {
        path: 'eventdetails',
        component: DetailEventComponent,
        canActivate: [AuthGuard],
    },
    { path: '404', component: PageNotFoundComponent },
    // mp
    {
        path: 'statsmp',
        component: StatsMpTableComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'mp-lifetime',
        component: StatsLifetimeComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'mp-weekly',
        component: StatsWeeklyComponent,
        canActivate: [AuthGuard],
    },
    { path: 'kills', component: KillsTableComponent, canActivate: [AuthGuard] },
    // wz
    {
        path: 'statswz',
        component: StatsWzTableComponent,
        canActivate: [AuthGuard],
    },
    {
        path: 'wz-lifetime',
        component: StatsLifetimeWzComponent,
        canActivate: [AuthGuard],
    },
    // Redirects
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: '**', redirectTo: '404' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
