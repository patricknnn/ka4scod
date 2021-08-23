import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/core/sidenav/sidenav.component';
import { ToolbarComponent } from './components/core/toolbar/toolbar.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { SuccesDialogComponent } from './components/dialog/succes-dialog/succes-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { KillsTableComponent } from './components/tables/kills-table/kills-table.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { SharedModule } from './modules/shared/shared.module';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { DynamicTablesModule } from './modules/dynamic-tables/dynamic-tables.module';
import { TitleSectionComponent } from './components/core/title-section/title-section.component';
import { LoadingComponent } from './components/core/loading/loading.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { EditPlayerComponent } from './components/firestore/edit-player/edit-player.component';
import { ViewPlayersComponent } from './components/firestore/view-players/view-players.component';
import { PromptDialogComponent } from './components/dialog/prompt-dialog/prompt-dialog.component';
import { EditVideoComponent } from './components/firestore/edit-video/edit-video.component';
import { ViewVideosComponent } from './components/firestore/view-videos/view-videos.component';
import { VideoCardComponent } from './components/cards/video-card/video-card.component';
import { PlayerCardComponent } from './components/cards/player-card/player-card.component';
import { PlayerTableComponent } from './components/tables/player-table/player-table.component';
import { ViewEventsComponent } from './components/firestore/view-events/view-events.component';
import { EditEventComponent } from './components/firestore/edit-event/edit-event.component';
import { DetailEventComponent } from './components/firestore/detail-event/detail-event.component';
import { StatsLifetimeComponent } from './components/tables/stats-lifetime/stats-lifetime.component';
import { StatsWeeklyComponent } from './components/tables/stats-weekly/stats-weekly.component';
import { StatsLifetimeWzComponent } from './components/tables/stats-lifetime-wz/stats-lifetime-wz.component';
import { EventCardComponent } from './components/cards/event-card/event-card.component';
import { FbLoginComponent } from './components/auth/fb-login/fb-login.component';
import { FbRegisterComponent } from './components/auth/fb-register/fb-register.component';
import { ProfileComponent } from './components/core/profile/profile.component';
import { UserInfoComponent } from './components/core/user-info/user-info.component';
import { FbLandingComponent } from './components/auth/fb-landing/fb-landing.component';
import { NotificationCardComponent } from './components/cards/notification-card/notification-card.component';

@NgModule({
    declarations: [
        AppComponent,
        SidenavComponent,
        ToolbarComponent,
        PlaygroundComponent,
        PageNotFoundComponent,
        SuccesDialogComponent,
        ErrorDialogComponent,
        KillsTableComponent,
        DashboardComponent,
        TitleSectionComponent,
        LoadingComponent,
        EditPlayerComponent,
        ViewPlayersComponent,
        PromptDialogComponent,
        EditVideoComponent,
        ViewVideosComponent,
        VideoCardComponent,
        PlayerCardComponent,
        PlayerTableComponent,
        ViewEventsComponent,
        EditEventComponent,
        DetailEventComponent,
        StatsLifetimeComponent,
        StatsWeeklyComponent,
        StatsLifetimeWzComponent,
        EventCardComponent,
        FbLoginComponent,
        FbRegisterComponent,
        ProfileComponent,
        UserInfoComponent,
        FbLandingComponent,
        NotificationCardComponent,
    ],
    imports: [
        SharedModule,
        DynamicFormsModule,
        DynamicTablesModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
