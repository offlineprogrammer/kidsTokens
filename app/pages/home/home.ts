import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DataService } from '../../services/data'

@Component({
  templateUrl: 'build/pages/home/home.html'
  
})
export class HomePage {
  items: Array<any>;
  constructor(
     private dataService: DataService,
  
    private navCtrl: NavController
    ) {


        this.dataService.getKids()
      .then((response) => {

        this.items = response;
         
        });


  

  
  }
}
