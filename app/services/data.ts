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

import {
    Task
} from '../models/task';
import {
    GAException
} from '../models/gaException';
import {
    GAService
} from '../services/googleAnalyticsService';

@Injectable()
export class DataService {
    storage: Storage;

    private DB_NAME: string = 'kidsToken.db';
    private KIDS_KEY: string = 'kids';

    Kids: Child[] = [];

    constructor(
        private http: Http,
        private platform: Platform,
        private gaService: GAService
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
            this.logError(error);
            // reject('Only available on a device');
        });
    }

    private logError(data: any) {
        let oGAException: GAException;
        oGAException = {
            description: data,
            isFatal: false

        };
        this.gaService.trackException(oGAException);

    }

    addTask(data: Task): Promise < any > {
        let oKids: any;
        return new Promise((resolve, reject) => {
            if (typeof this.Kids === 'undefined') {
                this.Kids = [];

            }
            // this.Kids.push(data);
            // this.saveData(this.Kids, this.KIDS_KEY);
            resolve('Done');

        }).catch((error) => {
            // reject('Only available on a device');
        });
    }

    deleteKid(data: Child): Promise < any > {

        return new Promise((resolve, reject) => {
            if (typeof this.Kids === 'undefined') {
                this.Kids = [];

            }
            let index = this.Kids.indexOf(data);

            if (index > -1) {
                this.Kids.splice(index, 1);
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

    getTokenTypes(): string[] {
        let tokenTypes: any = ['images/star.png',
            'images/face.png',
            'images/giraffe.png',
            'images/leopard.png',
            'images/monkey.png',
            'images/monkeytoy.png',
            'images/rocket.png',
            'images/Sheep.png',
            'images/teddybear.png',
            'images/train.png',
            'images/triceratops.png',
        ];
        return tokenTypes;

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