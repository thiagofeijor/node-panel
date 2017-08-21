import { Component, OnInit } from '@angular/core';
import { DxButtonModule } from 'devextreme-angular';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  user: any;

  constructor() { }

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('fruser'));
  }
}
