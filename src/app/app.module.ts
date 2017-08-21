import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DxButtonModule } from 'devextreme-angular';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HomeComponent } from './home/home.component';
import { DashComponent } from './dash/dash.component';
import { LoginComponent } from './login/login.component';
import { RequisicoesService } from './requisicoes.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DxButtonModule,
    ReactiveFormsModule
  ],
  providers: [
    RequisicoesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
