import {
  Component
} from '@angular/core';
import { Modal }                                           from 'ionic-angular/components/modal/modal';
import {
  NavController
} from 'ionic-angular';
import {
  DataService
} from '../../services/data';
import { AddKidModal }                                  from './add-kid-modal';
import { Child }                       from '../../models/child';



@Component({
  templateUrl: 'build/pages/home/home.html'

})
export class HomePage {
  kids: Child[] =[];
 
  constructor(
    private dataService: DataService,
     private nav: NavController,
    private navCtrl: NavController
  ) {


    this.dataService.getKids()
      .then((response) => {

        this.kids = response;

      });





  }

    addNewKid(): void {
      let modal = Modal.create(AddKidModal);
        this.nav.present(modal);

      // let newkid: any;
      //   newkid = {
      //       name: 'Malaka',
      //       token: 'start'
      //   };
      //   this.dataService.addKid(newkid)
      //   .then(() => {
           
      //     });
   
  }


  
}