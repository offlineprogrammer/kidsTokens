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


@Component({
  templateUrl: 'build/pages/task/taskInfo.html'

})
export class TaskInfo {
 oChild: Child;
 oTask: Task;
 tokenNumbers: number[];
 tokenstriples: number[];
 
  constructor(
    private dataService: DataService,
     private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalController : ModalController
  ) {
   this.oTask = navParams.get('task');
   this.oChild = navParams.get('child');
   //this.tokenNumbers = Array(+this.oChild.tokenNumbers).fill(1);
   this.tokenNumbers = this.fillArrayWithNumbers(+this.oChild.tokenNumbers);//Array(+this.oChild.tokenNumbers).map(function (x, i) { return i });
   this.tokenstriples = this.getTriples();
   
  }


fillArrayWithNumbers(n:number) {
    let nArray = [];
    nArray =  Array.apply(null, Array(n));
    return nArray.map(function (x, i) { return i });
}

  getTriples() {
    let triples = [];
    let length = this.tokenNumbers.length;
    for (let i = 0; i < length; i += 3) {
        let trio = [];
        trio.push(this.tokenNumbers[i]);
        if (i + 1 < length) {
            trio.push(this.tokenNumbers[i + 1]);
        }
        if (i + 2 < length) {
            trio.push(this.tokenNumbers[i + 2]);
        }

        triples.push(trio);
    }
    return triples;
}


    private updateData(): void {
        this.dataService.updateKids()
            .then(() => {});
    }

    addToken(): void {
      console.log(this.oTask.score);
      this.oTask.score++;
      this.updateData();
       console.log(this.oTask.score);
    }

    removeToken(): void {
      console.log(this.oTask.score);
      this.oTask.score--;
      this.updateData();
      console.log(this.oTask.score);
    }



   

  
}