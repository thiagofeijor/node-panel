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

var appRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'admin', component: DashComponent },
    { path: 'admin/usuarios', component: UsuariosComponent },
    { path: 'admin/profile', component: ProfileComponent },
    { path: 'admin/administradores', component: AdminstradoresComponent },
    { path: 'admin/messagens', component: MessageComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}