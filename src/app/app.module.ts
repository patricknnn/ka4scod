import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { SidenavComponent } from './components/core/sidenav/sidenav.component';
import { ToolbarComponent } from './components/core/toolbar/toolbar.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { LoginComponent } from './components/api/login/login.component';
import { SuccesDialogComponent } from './components/dialog/succes-dialog/succes-dialog.component';
import { ErrorDialogComponent } from './components/dialog/error-dialog/error-dialog.component';
import { RankCardComponent } from './components/cards/rank-card/rank-card.component';
import { RankBpCardComponent } from './components/cards/rank-bp-card/rank-bp-card.component';
import { KillsTableComponent } from './components/tables/kills-table/kills-table.component';
import { DashboardComponent } from './components/core/dashboard/dashboard.component';
import { SharedModule } from './modules/shared/shared.module';
import { DynamicFormsModule } from './modules/dynamic-forms/dynamic-forms.module';
import { DynamicTablesModule } from './modules/dynamic-tables/dynamic-tables.module';
import { TitleSectionComponent } from './components/core/title-section/title-section.component';
import { LoadingComponent } from './components/core/loading/loading.component';
import { StatsMpTableComponent } from './components/tables/stats-mp-table/stats-mp-table.component';
import { StatsWzTableComponent } from './components/tables/stats-wz-table/stats-wz-table.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    PlaygroundComponent,
    PageNotFoundComponent,
    LoginComponent,
    SuccesDialogComponent,
    ErrorDialogComponent,
    RankCardComponent,
    RankBpCardComponent,
    KillsTableComponent,
    DashboardComponent,
    TitleSectionComponent,
    LoadingComponent,
    StatsMpTableComponent,
    StatsWzTableComponent
  ],
  imports: [
    SharedModule,
    DynamicFormsModule,
    DynamicTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
