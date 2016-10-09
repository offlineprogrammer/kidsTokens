import {
    Injectable
} from '@angular/core';
import {
    Http
} from '@angular/http';

import {
    Platform
} from 'ionic-angular';
import {
    Observable
} from 'rxjs/Observable';
import {
    GoogleAnalytics
} from 'ionic-native';
import {
    GAEvent
} from '../models/gaEvent';
import {
    GAException
} from '../models/gaException';

import 'rxjs/Rx';



@Injectable()
export class GAService {


    constructor(
        private http: Http,
        private platform: Platform
    ) {
        this.platform.ready().then(() => {
            try {
                 GoogleAnalytics.debugMode();
             GoogleAnalytics.startTrackerWithId('UA-70035565-4');

             GoogleAnalytics.enableUncaughtExceptionReporting(true)
                 .then((_success) => {
                     console.log(_success);
                 }).catch((_error) => {
                     console.log(_error);
                 });

            } catch (error) {
                 console.log(error);
            }
            });
    }

trackView(data: any): any {
        this.platform.ready().then(() => {
      GoogleAnalytics.trackView(data);
    });
    }

trackException(data: GAException): any {
        this.platform.ready().then(() => {
      GoogleAnalytics.trackException(data.description, data.isFatal);
    });
    }


trackEvent(data: GAEvent): any {
        this.platform.ready().then(() => {
      GoogleAnalytics.trackEvent(data.category, data.action, data.label, data.value);
    });
    }











}