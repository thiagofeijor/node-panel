import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  adeslogado: boolean = !localStorage.getItem('fruser');
  popupVisible: boolean = false;
  bem_vindo: string = 'Bem vindo';
  telas = {'/admin/usuarios':'Usuários',
           '/admin':'Bem vindo',
           '/admin/messagens':'Mensagens',
           '/admin/administradores':'Administradores',
           '/admin/profile':'Perfil'};

  constructor(private router: Router) {
    router.events.subscribe(( path: any ) => {
      this.bem_vindo = this.telas[path.url];
    });
  }

  ngOnInit() {
  }
  
  showAbout() {
      this.popupVisible = true;
  }

  hideAbout(){
    this.popupVisible = false;
  }
}
