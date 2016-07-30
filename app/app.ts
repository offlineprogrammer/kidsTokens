import {Component} from '@angular/core';
import {Platform, ionicBootstrap} from 'ionic-angular';
import {StatusBar, SQLite} from 'ionic-native';
import {HomePage} from './pages/home/home';
import { DataService }  from './services/data';

@Component({
  template: '<ion-nav [root]="rootPage"></ion-nav>'
})
export class KidsToken {

  private rootPage: any;

  constructor(
    private dataService: DataService,
    private platform: Platform
    ) {
    this.rootPage = HomePage;

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();


     



    });
  }
}

ionicBootstrap(KidsToken,[DataService]);
