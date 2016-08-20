import {
  Component
} from '@angular/core';
import {
  Modal
} from 'ionic-angular/components/modal/modal';
import {
  NavController,
  ModalController
} from 'ionic-angular';
import {
  DataService
} from '../../services/data';
import {
  AddKidModal
} from './add-kid-modal';
import {
  Child
} from '../../models/child';
import {
  ChildInfo
} from '../child/ChildInfo';
import {
  GAService
} from '../../services/googleAnalyticsService';





@Component({
  templateUrl: 'build/pages/home/home.html'

})
export class HomePage {
  kids: Child[] = [];

  constructor(
    private dataService: DataService,
    private gaService: GAService,
    private nav: NavController,
    private navCtrl: NavController,
    private modalController: ModalController
  ) {


    this.dataService.getKids()
      .then((response) => {

        this.kids = response;

      });

      this.gaService.trackView('HomePage');



  }

  addNewKid(): void {
    let modal = this.modalController.create(AddKidModal);
    modal.onDidDismiss(data => {
      this.dataService.getKids()
        .then((response) => {

          this.kids = response;

        });
    });

    modal.present();

  }

  itemSelected(data: Child): void {
    this.navCtrl.push(ChildInfo, {
      child: data

    });

    console.log(data);

  }


}