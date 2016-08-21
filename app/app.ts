import {
  Component,
  ViewChild
} from '@angular/core';
import {
  Nav,
  Platform,
  ionicBootstrap
} from 'ionic-angular';
import {
  StatusBar,
  SQLite,
  GoogleAnalytics
} from 'ionic-native';
import {Splashscreen} from 'ionic-native';
import {
  HomePage
} from './pages/home/home';
import {
  DataService
} from './services/data';
import {
  GAService
} from './services/googleAnalyticsService';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class KidsToken {
  @ViewChild(Nav) nav: Nav;
  private rootPage: any;
  homePage: any = HomePage;

  constructor(
    private dataService: DataService,
    private gaService: GAService,
    private platform: Platform
  ) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      this.hideSplashScreen();
      this.openPage(this.homePage);
    });
  }

hideSplashScreen() {
    if (Splashscreen) {
        setTimeout(() => {
            Splashscreen.hide();
        }, 100);
    }
}

  openPage(page): void {
    this.nav.setRoot(page);
    //this.menu.close()
  }
}

ionicBootstrap(KidsToken, [DataService, GAService]);