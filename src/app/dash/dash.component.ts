import { Component, OnInit } from '@angular/core';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  
  constructor() { }

  ngOnInit() {
  }
  
  sair(){
    localStorage.removeItem('fruser');
    window.location.href = 'https://appmastermind.herokuapp.com/';
  }
} 