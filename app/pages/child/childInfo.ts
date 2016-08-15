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
import { AddTaskModal }                                  from './add-task-modal';



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
    private actionSheetController : ActionSheetController,
    private modalController : ModalController
  ) {
   this.oChild = navParams.get('child');
   
  }

     changeToken(): void {
     
     let actionSheet = this.actionSheetController.create({
      title: 'Change Token Type',
      cssClass: 'action-sheets-basic-page' ,
      buttons: [
        {
          text: 'Star',
          
           //icon: 'images/star.png',
          handler: () => {
            this.oChild.tokenType = 'images/star.png';
            this.updateData();
           
          }
        }, {
          text: 'Smiley Face',
          
          handler: () => {
            this.oChild.tokenType = 'images/face.png';
             this.updateData();
            
          }
        }
      ]
    });
    actionSheet.present();
   
  }


    private updateData(): void {
        this.dataService.updateKids()
            .then(() => {});
    }



     changeTokenNumbers(): void {
     
     let actionSheet = this.actionSheetController.create({
      title: 'Change Token Numbers',
      buttons: [
        {
          text: '5',
          role: '5',
          handler: () => {
            this.oChild.tokenNumbers = 5;
            this.updateData();
          }
        }, {
          text: '4',
          role: '4',
          handler: () => {
            this.oChild.tokenNumbers = 4;
            this.updateData();
          }
        }, {
          text: '3',
          role: '3',
          handler: () => {
            this.oChild.tokenNumbers = 3;
            this.updateData();
          }
        }, {
          text: '2',
          role: '2',
          handler: () => {
            this.oChild.tokenNumbers = 2;
            this.updateData();
          }
        }, {
          text: '1',
          role: '1',
          handler: () => {
            this.oChild.tokenNumbers = 1;
            this.updateData();
          }
        }
      ]
    });
    actionSheet.present();
   
  }


      addNewTask(): void {
      let modal = this.modalController.create(AddTaskModal);
        modal.present();
   
  }


   

  
}