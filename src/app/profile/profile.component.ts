import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  inicial: boolean = !localStorage.getItem('fri001');

  constructor() { }

  ngOnInit() {
  }

  stepInicial(){
    localStorage.setItem('fri001', 'true');
    this.inicial = !this.inicial
  }

}
