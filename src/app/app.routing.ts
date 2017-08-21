import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashComponent } from './dash/dash.component';

try{
    var adeslogado: boolean = !localStorage.getItem('fruser');
}catch(err){
    var adeslogado: boolean = false;
}

const APP_ROUTES: Routes = [ 
    { path: 'admin', component: ( adeslogado ? LoginComponent : DashComponent)},
    { path: '', component: HomeComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(APP_ROUTES);