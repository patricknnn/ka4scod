import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { PlaygroundComponent } from './components/api/playground/playground.component';
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
import { StatsWeeklyComponent } from './components/tables/stats-weekly/stats-weekly.component';

const routes: Routes = [
    // profile
    {
        path: 'fb-profile',
        component: ProfileComponent,
        data: { breadcrumb: 'Profile' },
        canActivate: [AuthGuard],
    },
    // general
    {
        path: 'dashboard',
        component: DashboardComponent,
        data: { breadcrumb: 'Dashboard' },
        canActivate: [AuthGuard],
    },
    {
        path: 'playground',
        component: PlaygroundComponent,
        data: { breadcrumb: 'Playground' },
        canActivate: [AuthGuard],
    },
    {
        path: 'players',
        component: ViewPlayersComponent,
        data: { breadcrumb: 'Players' },
        canActivate: [AuthGuard],
    },
    {
        path: 'player',
        component: EditPlayerComponent,
        data: { breadcrumb: 'Player details' },
        canActivate: [AuthGuard],
    },
    {
        path: 'playerstats',
        component: PlayerTableComponent,
        data: { breadcrumb: 'Player statistics' },
        canActivate: [AuthGuard],
    },
    {
        path: 'videos',
        component: ViewVideosComponent,
        data: { breadcrumb: 'Videos' },
        canActivate: [AuthGuard],
    },
    {
        path: 'video',
        component: EditVideoComponent,
        data: { breadcrumb: 'Video details' },
        canActivate: [AuthGuard],
    },
    {
        path: 'events',
        component: ViewEventsComponent,
        data: { breadcrumb: 'Events' },
        canActivate: [AuthGuard],
    },
    {
        path: 'event',
        component: EditEventComponent,
        data: { breadcrumb: 'Event details' },
        canActivate: [AuthGuard],
    },
    {
        path: 'eventdetails',
        component: DetailEventComponent,
        data: { breadcrumb: 'Event statistics' },
        canActivate: [AuthGuard],
    },
    {
        path: '404',
        data: { breadcrumb: 'Page not found' },
        component: PageNotFoundComponent,
    },
    // mp
    {
        path: 'mp-lifetime',
        component: StatsLifetimeComponent,
        data: { breadcrumb: 'Lifetime statistics' },
        canActivate: [AuthGuard],
    },
    {
        path: 'mp-weekly',
        component: StatsWeeklyComponent,
        data: { breadcrumb: 'Weekly statistics' },
        canActivate: [AuthGuard],
    },
    {
        path: 'kills',
        component: KillsTableComponent,
        data: { breadcrumb: 'Kill statistics' },
        canActivate: [AuthGuard],
    },
    // wz
    {
        path: 'wz-lifetime',
        component: StatsLifetimeWzComponent,
        data: { breadcrumb: 'Lifetime statistics' },
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
