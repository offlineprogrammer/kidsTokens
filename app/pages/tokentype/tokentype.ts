import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';
import {
  DataService
} from '../../services/data';

@Component({
  templateUrl: 'build/pages/tokentype/tokentype.html',
})
export class TokentypePage {
  selectedToken: string;
  tokenTypes: string[];

  constructor(private dataService: DataService,
              private navCtrl: NavController,
              private viewCtrl: ViewController,
              private navParams: NavParams) {
                this.selectedToken = navParams.get('selectedToken');
                this.tokenTypes = dataService.getTokenTypes();



  }

itemSelected(data: string): void {

   this.viewCtrl.dismiss( {selectedToken: data});
    

  }

    dismiss() {
    this.viewCtrl.dismiss( {selectedToken: this.selectedToken});
  }

}
