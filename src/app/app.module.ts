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
import { UsuariosComponent } from './usuarios/usuarios.component';
import { MenuComponent } from './ui-components/menu/menu.component';
import { ProfileComponent } from './profile/profile.component';
import { UprofileComponent } from './ui-components/uprofile/uprofile.component';
import { AdminstradoresComponent } from './adminstradores/adminstradores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashComponent,
    LoginComponent,
    UsuariosComponent,
    MenuComponent,
    MenuComponent,
    ProfileComponent,
    UprofileComponent,
    AdminstradoresComponent
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
