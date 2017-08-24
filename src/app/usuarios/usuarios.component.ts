import { Component, OnInit } from '@angular/core';

import { RequisicoesService } from '../requisicoes.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  loading: boolean = false;
  subview: string = '';
  url: string = '';
  usuarios: any;
  usuario: any;

  constructor(public req: RequisicoesService) { }

  ngOnInit() {
    this.url = this.req.getServer();
    this.search();
  }

  search(){
    this.loading = true;
    this.req.getInternal('usuario')
      .subscribe((response) => {
        this.loading = false;
        console.log(response);
        this.usuarios = response; 
      },(err) => {
        this.loading = false;
        console.log(err);
      });
  }

  select(item){
    this.subview = 'view';
    this.usuario = item;
  }
  
  delete(){
    this.loading = true;
    this.req.getInternal('usuario/' + this.usuario._id + '/delete')
      .subscribe((response) => {
        this.loading = false;
        this.subview = '';
        this.search();
      },(err) => {
        this.loading = false;
        console.log(err);
      });

  }


}
