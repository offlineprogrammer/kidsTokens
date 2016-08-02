import { Component }                 from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';
import { DataService }               from '../../services/data';

@Component({
    templateUrl: 'build/pages/home/add-kid-modal.html'
})
export class AddKidModal {
    rootParams: any;

    

    constructor(private viewController: ViewController, 
    private dataService: DataService,
    navParams: NavParams) {
       
    }

    close() {
        this.viewController.dismiss();
    }

        addKid(): void {
     

      let newkid: any;
        newkid = {
            name: 'Malaka222',
            token: 'start'
        };
        this.dataService.addKid(newkid)
        .then(() => {
           
          });
   
  }

}






