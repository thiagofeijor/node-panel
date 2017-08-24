import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  adeslogado: boolean = !localStorage.getItem('fruser');
  user;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('fruser'));
  }
}
