import { Component, OnInit } from '@angular/core';
import { DxPopupModule, DxButtonModule, DxTemplateModule } from 'devextreme-angular';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponent implements OnInit {
  popupVisible = false;
  
  constructor() { }

  ngOnInit() {
  }
  
  showInfo(employee) {
      this.popupVisible = true;
  }
} 