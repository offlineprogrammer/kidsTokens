import { Injectable }                    from '@angular/core';
import { Http }                          from '@angular/http';

import { Platform, SqlStorage, Storage } from 'ionic-angular';
import { Observable }                    from 'rxjs/Observable';


import 'rxjs/Rx';

@Injectable()
export class DataService {
    storage: Storage;

    private DB_NAME: string = 'kidsToken.db';
    private KIDS_KEY: string = 'kids';
    private LOCATION_KEY: string = 'location';
    private Kids: any = [];

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

    addKid(data: any): void {
        let newkid: any;
        newkid = {
            name: 'Mohammed',
            token: 'start'
        };
        this.Kids.push(newkid);
        this.saveData(this.Kids, this.KIDS_KEY);
    }

    getKids(): Promise<any> {
        let oKids: any;
        return new Promise(resolve => {
            // this.http.get(WEB_API_URL + 'Partner/GetAll')
            //     .map(result => result.json())
            //     .subscribe(data => {
            //         resolve(data)
            //     })

              this.Kids = this.storage.get(this.KIDS_KEY).then((value) => {
  console.log(value );
  oKids = JSON.parse(value);
  this.Kids = oKids;
  
   resolve(this.Kids);
});

        })



        
        
         

           
       
    }

    setProfile(data: any): void {
        this.saveData(data, this.KIDS_KEY);
    }

    getLocation(): Promise<any> {
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