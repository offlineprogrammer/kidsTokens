import {
  Component
} from '@angular/core';
import { Modal }                                           from 'ionic-angular/components/modal/modal';
import {
  NavController, NavParams 
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
    private navParams: NavParams
  ) {
   this.oChild = navParams.get('child');
   
  }

   

  
}