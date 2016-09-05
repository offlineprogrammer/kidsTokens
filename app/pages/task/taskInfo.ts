import {
  Component
} from '@angular/core';
import {
  Modal
} from 'ionic-angular/components/modal/modal';
import {
  NavController,
  NavParams,
  ActionSheetController,
  ModalController,
  Platform
} from 'ionic-angular';

import {
  SocialSharing
} from 'ionic-native';
import {
  DataService
} from '../../services/data';

import {
  Child
} from '../../models/child';
import {
  Task
} from '../../models/task';
import {
  GAService
} from '../../services/googleAnalyticsService';
import {
  GAEvent
} from '../../models/gaEvent';
import {
  NativeAudio
} from 'ionic-native';


@Component({
  templateUrl: 'build/pages/task/taskInfo.html'

})
export class TaskInfo {
  oChild: Child;
  oTask: Task;
  tokenNumbers: number[];
  tokenstriples: number[];
  bSocialSharing: boolean = false;

  constructor(
    private dataService: DataService,
    private gaService: GAService,
    private nav: NavController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private modalController: ModalController,
    private platform: Platform
  ) {
    this.oTask = navParams.get('task');
    this.oChild = navParams.get('child');
    this.tokenNumbers = this.fillArrayWithNumbers(+this.oChild.tokenNumbers);
    this.tokenstriples = this.getTriples();
    this.gaService.trackView('TaskInfo');
    platform.ready().then(() => {
      NativeAudio.preloadSimple('win', 'images/win.mp3').then(function(msg) {
        console.log(msg);
      }, function(error) {
        console.log(error);
      });
      SocialSharing.canShareVia('Facebook').then(() => {
        this.bSocialSharing = true;
      }).catch(() => {
        this.bSocialSharing = false;
        
      });
    });



  }


  fillArrayWithNumbers(n: number) {
    let nArray = [];
    nArray = Array.apply(null, Array(n));
    return nArray.map(function(x, i) {
      return i;
    });
  }

  getTriples() {
    let triples = [];
    let length = this.tokenNumbers.length;
    for (let i = 0; i < length; i += 2) {
      let trio = [];
      trio.push(this.tokenNumbers[i]);
      if (i + 1 < length) {
        trio.push(this.tokenNumbers[i + 1]);
      }
      triples.push(trio);
    }
    return triples;
  }

  facebookShare() {
    this.platform.ready().then(() => {
      let shareMessage: string = this.oChild.tokenNumbers.toString() + ' tokenz for ' + this.oChild.name + ' :) time for  ' + this.oTask.name;

      SocialSharing.shareViaFacebook(shareMessage, this.oTask.taskimage, null)
        .then(() => {

          },
          () => {
            alert('failed');
          });

    });
  }


  private updateData(): void {
    this.dataService.updateKids()
      .then(() => {
        if (this.oTask.score === this.oChild.tokenNumbers) {
          this.playSound('win');
        }
        let oGAEvent: GAEvent;
        oGAEvent = {
          category: 'Task',
          action: 'UpdateScore',
          label: this.oTask.name,
          value: this.oTask.score
        };
        this.gaService.trackEvent(oGAEvent);


      });
  }

  private stopSound(key: string): void {


  }

  private playSound(key: string): void {
    NativeAudio.play(key, function(key) {}).then(function(msg) {
      console.log(msg);
    }, function(error) {
      console.log(error);
    });

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

  resetScore(): void {
    this.oTask.score = 0;
    this.updateData();
  }

  deleteTask(data: Task): void {

    let index = this.oChild.tasks.indexOf(data);

    if (index > -1) {
      this.oChild.tasks.splice(index, 1);
    }
    this.updateData();

    this.navCtrl.pop();

  }







}