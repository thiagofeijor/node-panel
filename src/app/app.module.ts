import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
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
    DxButtonModule,
    DxPopupModule,
    DxTemplateModule,
    AppRoutingModule,
    ReactiveFormsModule,
  ],
  providers: [
    RequisicoesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
