import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './modules/material/material.module';
import { SidenavComponent } from './components/core/sidenav/sidenav.component';
import { ToolbarComponent } from './components/core/toolbar/toolbar.component';
import { PlaygroundComponent } from './components/api/playground/playground.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageNotFoundComponent } from './components/core/page-not-found/page-not-found.component';
import { LoginComponent } from './components/api/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ToolbarComponent,
    PlaygroundComponent,
    PageNotFoundComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
