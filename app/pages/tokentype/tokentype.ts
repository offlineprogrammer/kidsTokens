import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/tokentype/tokentype.html',
})
export class TokentypePage {
  selectedToken: string;

  constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private navParams: NavParams) {
                this.selectedToken = navParams.get('selectedToken');


  }


    dismiss() {
    this.viewCtrl.dismiss();
  }

}
