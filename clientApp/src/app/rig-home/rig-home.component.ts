import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';


@Component({
  selector: 'app-rig-home',
  templateUrl: './rig-home.component.html',
  styleUrls: ['./rig-home.component.scss'],
})
export class RigHomeComponent implements OnInit {
  folderList = [];

  constructor(private menu: MenuController) { }

  openFirst() {
    this.menu.enable(true, 'first');
    this.menu.open('first');
  }

  openEnd() {
    this.menu.open('end');
  }

  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  ngOnInit() {
    this.folderList = [{
      "value":"Crane"},  
      {"value":"Drilling"},
      {"value":"Electrical"},
      {"value":"Marine"},
      {"value":"Mechanical"},
      {"value":"Miscellaneous"},
      {"value":"Subsea"},
      {"value":"Welder"},
      {"value": "Catering"},
      {"value": "Engineering"},
      {"value": "Stores"},
      {"value": "Site-Specific Forms"}];
    }   

}
