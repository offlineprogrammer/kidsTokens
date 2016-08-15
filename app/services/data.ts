import {
    Injectable
} from '@angular/core';
import {
    Http
} from '@angular/http';

import {
    Platform,
    SqlStorage,
    Storage
} from 'ionic-angular';
import {
    Observable
} from 'rxjs/Observable';


import 'rxjs/Rx';

import {
    Child
} from '../models/child';

@Injectable()
export class DataService {
    storage: Storage;

    private DB_NAME: string = 'kidsToken.db';
    private KIDS_KEY: string = 'kids';
    private LOCATION_KEY: string = 'location';
    Kids: Child[] = [];

    constructor(
        private http: Http,
        private platform: Platform
    ) {
        this.platform.ready().then(() => {
            let options: any;

            if (this.platform.is('ios')) {
                options = {
                    name: this.DB_NAME,
                    iosDatabaseLocation: 'default'
                };
            } else {
                options = {
                    name: this.DB_NAME,
                    location: 'default'
                };
            }

            this.storage = new Storage(SqlStorage, options);
        });
    }


    updateKids(): Promise < any > {
        let oKids: any;
        return new Promise((resolve, reject) => {
            if (typeof this.Kids === 'undefined') {
                this.Kids = [];

            }
            
            this.saveData(this.Kids, this.KIDS_KEY);
            resolve('Done');

        }).catch((error) => {
            // reject('Only available on a device');
        });
    }


    addKid(data: Child): Promise < any > {
        let oKids: any;
        return new Promise((resolve, reject) => {
            if (typeof this.Kids === 'undefined') {
                this.Kids = [];

            }
            this.Kids.push(data);
            this.saveData(this.Kids, this.KIDS_KEY);
            resolve('Done');

        }).catch((error) => {
            // reject('Only available on a device');
        });
    }

    getKids(): Promise < Child[] > {
        let oKids: any;
        return new Promise(resolve => {
            if (typeof(this.storage) !== 'undefined') {
                this.storage.get(this.KIDS_KEY).then((value) => {
                    if (value) {
                        console.log(value);
                        this.Kids = JSON.parse(value);
                        // this.Kids = oKids;

                        resolve(this.Kids);
                    }
                });

            }
        });
    }

    setProfile(data: any): void {
        this.saveData(data, this.KIDS_KEY);
    }

    getLocation(): Promise < any > {
        return this.storage.get(this.LOCATION_KEY);
    }

    setLocation(data: any): void {
        this.saveData(data, this.LOCATION_KEY);
    }



    private saveData(data: any, key: string) {
        if (data) {
            let newData = JSON.stringify(data);
            this.storage.set(key, newData);
        } else {
            this.storage.remove(key);
        }
    }
}