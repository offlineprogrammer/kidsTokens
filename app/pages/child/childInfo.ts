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
import { AddTaskModal }                                  from './add-task-modal';
import {
  TaskInfo
} from '../task/TaskInfo';
import {
  GAService
} from '../../services/googleAnalyticsService';
import {
  TokentypePage
} from '../tokentype/tokentype';
import {
  TokenNumbersPage
} from '../token-numbers/token-numbers';





@Component({
  templateUrl: 'build/pages/child/childInfo.html'

})
export class ChildInfo {
 oChild: Child;
 
  constructor(
    private dataService: DataService,
    private gaService: GAService,
     private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private actionSheetController : ActionSheetController,
    private modalController : ModalController
  ) {
   this.oChild = navParams.get('child');
   this.gaService.trackView('ChildInfo');
   
  }

   changeToken(): void {
        let modal = this.modalController.create(TokentypePage, {selectedToken: this.oChild.tokenType});
    modal.onDidDismiss(data => {
     this.oChild.tokenType = data.selectedToken;
      this.updateData();
    });

    modal.present();
    }


   


    private updateData(): void {
      this.oChild.srcTokenNumbers = 'images/' + this.oChild.tokenNumbers + '.png',
        this.dataService.updateKids()
            .then(() => {});
    }

    changeTokenNumbers(): void {
        let modal = this.modalController.create(TokenNumbersPage, {tokenNumbers: this.oChild.srcTokenNumbers});
    modal.onDidDismiss(data => {
     this.oChild.tokenNumbers = data.tokenNumbers;
     this.oChild.srcTokenNumbers = 'images/' + this.oChild.tokenNumbers + '.png';
     this.updateData();
    });

    modal.present();
    }



    


      addNewTask(data: any): void {
      let modal = this.modalController.create(AddTaskModal, {'child': this.oChild});
        modal.present();
   
  }


  itemSelected(data: Task): void {
      this.navCtrl.push(TaskInfo, {task: data, child: this.oChild});
  
      console.log(data);
   
  }

  deleteChild(data: Child): void {
 
         this.dataService.deleteKid(data)
            .then(() => {
              this.navCtrl.pop();
            });

         

    }




   

  
}