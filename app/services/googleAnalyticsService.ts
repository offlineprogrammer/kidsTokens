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


import 'rxjs/Rx';


@Injectable()
export class DataService {
  

    constructor(
        private http: Http,
        private platform: Platform
    ) {
        this.platform.ready().then(() => {
            let options: any;

            
        });
    }


   

 

 

 

 

   
}