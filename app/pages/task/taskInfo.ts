import {
  Component
} from '@angular/core';
import { Modal }                                           from 'ionic-angular/components/modal/modal';
import {
  NavController, NavParams, ActionSheetController, ModalController   
} from 'ionic-angular';


import {
  DataService
} from '../../services/data';

import { Child }                       from '../../models/child';
import { Task }                       from '../../models/task';


@Component({
  templateUrl: 'build/pages/task/taskInfo.html'

})
export class TaskInfo {
 oChild: Child;
 oTask: Task;
 
  constructor(
    private dataService: DataService,
     private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalController : ModalController
  ) {
   this.oTask = navParams.get('task');
   
  }


    private updateData(): void {
        this.dataService.updateKids()
            .then(() => {});
    }



   

  
}