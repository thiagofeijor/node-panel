import { NgModule } from '@angular/core';
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

const appRoutes: Routes = [
    { path: 'admin', component: ( adeslogado ? LoginComponent : DashComponent) },
    { path: '', component: HomeComponent },
    { path: '**', component: HomeComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}