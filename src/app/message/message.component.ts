import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RequisicoesService } from '../requisicoes.service';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
  loading: boolean = false;
  respForm: FormGroup;
  subview: string = '';
  active: string  = 'saida';
  url: string = '';
  mesage: any;
  mesagens: any;
  interv;

  constructor(public req: RequisicoesService) { }

  ngOnInit() {
    this.url = this.req.getServer();
    this.respForm = this.req.getFormResp();
    this.search();
  }
  
  search(){
    this.loading = true;
    this.req.getInternal('faleconosco')
      .subscribe((response) => {
        this.loading = false;
        console.log(response);
        this.mesagens = response; 
      },(err) => {
        this.loading = false;
        console.log(err);
      });
  }

  select(item){
    this.subview = 'view';
    this.mesage = item;
  }

  responder(){
    this.subview = 'responder';
    this.respForm.reset();
    this.respForm.controls['tipo'].setValue( 'entrada' );
    this.respForm.controls['_iduser'].setValue( this.mesage._iduser );
    this.respForm.controls['_iduser'].setValue( this.mesage._iduser );
    this.respForm.controls['_idretorno'].setValue( this.mesage._id );
    this.respForm.controls['assunto'].setValue( this.mesage.assunto );
  }

  btnResp(){
    if(this.respForm.valid){
      this.loading = true;
      this.req.submitInternal('faleconosco', this.respForm.value)
        .subscribe(data => {

          this.req.getInternal(`faleconosco/respondido/${this.mesage._id}`)
            .subscribe((response) => {
              this.search();
            });

          this.loading = false;
          this.subview = '';
        },
        (err) => {
          if(err.status == 400 || err.status == 401){
            alert(JSON.parse(err._body).msg);
          }
        });
    }else{
      alert("Todos campos precisam ser validos.");
    }
  }

}
