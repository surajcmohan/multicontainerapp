import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { ScreenOrientation } from '@ionic-native/screen-orientation/ngx';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { environment } from 'src/environments/environment';
import { DataServiceService } from './services/data-service.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private screenOrientation: ScreenOrientation,
    private dataServiceService: DataServiceService
  ) {
    //console.log(this.screenOrientation.type);
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      if (environment.isAndroidApp || environment.isIOSApp) {
        this.screenOrientation.lock("landscape");
        this.screenOrientation.unlock();
        //Creating Table and DB
        setTimeout( () => {
          this.dataServiceService.initialiseDB();
     }, 1000);
        //this.dataServiceService.initialiseDB();
      }
    });
  }
}
