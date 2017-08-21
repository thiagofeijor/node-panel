import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { RequisicoesService } from '../requisicoes.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;

  constructor(public req: RequisicoesService) { }

  ngOnInit() {
    this.loginForm = this.req.getFormLogin();
  }

  enviar(){
    this.loading = true;
    this.req.submitInternal('administrador/login',this.loginForm.value)
      .subscribe((response) => {
        localStorage.setItem('fruser', JSON.stringify(response));
        window.location.reload();
      },(err) => {
        this.loading = false;
        console.log(err);
      });
  }

}
