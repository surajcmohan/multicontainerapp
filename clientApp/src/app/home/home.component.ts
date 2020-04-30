import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  folderList = [];
  constructor() { 
  }


  ngOnInit() {

  this.folderList = [{
      "value":"144 - Ocean Apex"},  
      {"value":"174 - Ocean BlackHawk"},
      {"value":"180 - Ocean BlackHornet"},
      {"value":"157 - Ocean BlackLion"},
      {"value":"188 - Ocean BlackRhino"},
      {"value":"176 - Ocean Courage"},
      {"value":"138 - Ocean GreatWhite"},
      {"value":"164 - Ocean Guardian"},
      {"value": "173 - Ocean Monarch"},
      {"value": "186 - Ocean Patriot"},
      {"value": "134 - Ocean Scepter"},
      {"value": "158 - Ocean Valiant"},
      {"value": "177 - Ocean Valor"}];
    }   
    
}
