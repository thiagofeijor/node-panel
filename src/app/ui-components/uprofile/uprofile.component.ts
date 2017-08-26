import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uprofile',
  templateUrl: './uprofile.component.html',
  styleUrls: ['./uprofile.component.css']
})
export class UprofileComponent implements OnInit {
  user;

  constructor() { }

  ngOnInit() {
    if(localStorage.getItem('fruser')){
      this.user = JSON.parse(localStorage.getItem('fruser'));
    }
  }
  
  sair(){
    localStorage.removeItem('fruser');
    window.location.href = 'https://appmastermind.herokuapp.com/';
  }

}
