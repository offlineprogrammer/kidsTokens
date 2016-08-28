import { Component } from '@angular/core';
import { NavController, ViewController, NavParams } from 'ionic-angular';

@Component({
  templateUrl: 'build/pages/token-numbers/token-numbers.html',
})
export class TokenNumbersPage {
   tokenNumbers: string;
   tokenNumbersArray: string[];

 constructor(private navCtrl: NavController,
              private viewCtrl: ViewController,
              private navParams: NavParams) {
                this.tokenNumbers = navParams.get('tokenNumbers');
              //  this.tokenNumbers = 'images/' + this.tokenNumbers + '.png';
                this.tokenNumbersArray = this.fillArrayWithNumbers(9);
  }

  fillArrayWithNumbers(n: number) {
    let nArray = [];
    nArray = Array.apply(null, Array(n));
    return nArray.map(function(x, i) {
      return 'images/' + (i + 1) + '.png';
     // return i + 1;
    });
  }

  itemSelected(data: string): void {
  let ntokenNumbers = data.match(/\d+/);
 console.log(ntokenNumbers);
 console.log(ntokenNumbers[0]);
   this.viewCtrl.dismiss( {tokenNumbers: ntokenNumbers[0]});
    

  }

   dismiss() {
     
     let ntokenNumbers = this.tokenNumbers.match(/\d+/);
    this.viewCtrl.dismiss( {tokenNumbers: ntokenNumbers[0]});
  }

}
