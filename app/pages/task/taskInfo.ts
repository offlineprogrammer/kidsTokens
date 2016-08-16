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
 tokenNumbers: number[];
 
  constructor(
    private dataService: DataService,
     private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalController : ModalController
  ) {
   this.oTask = navParams.get('task');
   this.oChild = navParams.get('child');
   this.tokenNumbers = Array(+this.oChild.tokenNumbers).fill(1);
   
  }


    private updateData(): void {
        this.dataService.updateKids()
            .then(() => {});
    }

    addToken(): void {
      console.log(this.oTask.score);
      this.oTask.score++;
      this.updateData();
       console.log(this.oTask.score);
    }

    removeToken(): void {
      console.log(this.oTask.score);
      this.oTask.score--;
      this.updateData();
      console.log(this.oTask.score);
    }



   

  
}