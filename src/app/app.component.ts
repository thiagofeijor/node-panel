import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit  {
  adeslogado: boolean = !localStorage.getItem('fruser');
  popupVisible: boolean = false;

  ngOnInit() {
  }
  
  showAbout() {
      this.popupVisible = true;
  }

  hideAbout(){
    this.popupVisible = false;
  }
}
