import { NgModule } from '@angular/core';
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { AdminstradoresComponent } from './adminstradores/adminstradores.component';
import { ProfileComponent } from './profile/profile.component';
import { MessageComponent } from './message/message.component';

try{
    var adeslogado: boolean = !localStorage.getItem('fruser');
}catch(err){
    var adeslogado: boolean = false;
}

const appRoutes: Routes = [
    { path: 'admin', component: ( adeslogado ? LoginComponent : DashComponent) },
    { path: 'admin/usuarios', component: ( adeslogado ? LoginComponent : UsuariosComponent) },
    { path: 'admin/profile', component: ( adeslogado ? LoginComponent : ProfileComponent) },
    { path: 'admin/administradores', component: ( adeslogado ? LoginComponent : AdminstradoresComponent) },
    { path: 'admin/messagens', component: ( adeslogado ? LoginComponent : MessageComponent) },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}