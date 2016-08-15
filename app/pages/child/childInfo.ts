import {
  Component
} from '@angular/core';
import { Modal }                                           from 'ionic-angular/components/modal/modal';
import {
  NavController, NavParams, ActionSheetController  
} from 'ionic-angular';


import {
  DataService
} from '../../services/data';

import { Child }                       from '../../models/child';



@Component({
  templateUrl: 'build/pages/child/childInfo.html'

})
export class ChildInfo {
 oChild: Child;
 
  constructor(
    private dataService: DataService,
     private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController : ActionSheetController
  ) {
   this.oChild = navParams.get('child');
   
  }

     changeToken(): void {
     
     let actionSheet = this.actionSheetController.create({
      title: 'Modify your album',
      buttons: [
        {
          text: 'Destructive',
          role: 'destructive',
          handler: () => {
            console.log('Destructive clicked');
          }
        }, {
          text: 'Archive',
          handler: () => {
            console.log('Archive clicked');
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
   
  }

   

  
}