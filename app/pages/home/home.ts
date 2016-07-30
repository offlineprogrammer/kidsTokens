import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import { DataService } from '../../services/data'

@Component({
  templateUrl: 'build/pages/home/home.html',
  providers: [DataService]
})
export class HomePage {
  constructor(private navCtrl: NavController) {
  
  }
}
