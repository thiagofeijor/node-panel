import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RequisicoesService } from '../requisicoes.service';

@Component({
  selector: 'app-adminstradores',
  templateUrl: './adminstradores.component.html',
  styleUrls: ['./adminstradores.component.css']
})
export class AdminstradoresComponent implements OnInit {
  loading: boolean = false;
  novoForm: FormGroup;
  edtForm: FormGroup;
  subview: string = '';
  url: string = '';
  usuarios: any;
  usuario: any;
  
  constructor(public req: RequisicoesService) { }

  ngOnInit() {
    this.url = this.req.getServer();
    this.novoForm = this.req.getFormUser();
    this.edtForm = this.req.getFormNewpass();
    this.search();
  }

  search(){
    this.loading = true;
    this.req.getInternal('administrador')
      .subscribe((response) => {
        this.loading = false;
        console.log(response);
        this.usuarios = response; 
      },(err) => {
        this.loading = false;
        console.log(err);
      });
  }

  btnNew(){
    console.log(this.novoForm.value);

    this.loading = true;
    this.req.submitInternal('administrador',this.novoForm.value)
      .subscribe((response) => {
        this.loading = false;
        this.novoForm.reset();
        this.subview = '';
        this.search();
      },(err) => {
        this.loading = false;
        console.log(err);
      });
  }

  btnPass(){
    if(this.edtForm.valid){
      this.loading = true;
      this.req.submitInternal('administrador/'+ this.usuario._id +'/pass',this.edtForm.value)
        .subscribe((response) => {
          this.loading = false;
          this.edtForm.reset();
          this.subview = '';
          this.search();
        },(err) => {
          this.loading = false;
          console.log(err);
        });
    }else{
      alert("As senhas devem ser iguais.");
    }
  }

  senha(){
    this.subview = 'senha';
    this.edtForm.reset();
  }

  novo(){
    this.subview = 'novo';
  }

  select(item){
    this.subview = 'view';
    this.usuario = item;
  }

  selectD(){
    this.subview = 'view';
  }

  delete(){
    this.loading = true;
    this.req.getInternal('administrador/' + this.usuario._id + '/delete')
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
