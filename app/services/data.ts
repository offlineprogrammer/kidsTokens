import { Injectable }                    from '@angular/core'
import { Http }                          from '@angular/http'

import { Platform, SqlStorage, Storage } from 'ionic-angular'
import { Observable }                    from 'rxjs/Observable'


import 'rxjs/Rx'

@Injectable()
export class DataService {
    storage: Storage

    private DB_NAME: string = 'printitanywhere.db'
    private PROFILE_KEY: string = 'profile'
    private LOCATION_KEY: string = 'location'

    constructor(
        private http: Http,
        private platform: Platform
    ) {
        this.platform.ready().then(() => {
            let options: any

            if (this.platform.is('ios')) {
                options = {
                    name: this.DB_NAME,
                    iosDatabaseLocation: 'default'
                }
            } else {
                options = {
                    name: this.DB_NAME,
                    location: 'default'
                }
            }

            this.storage = new Storage(SqlStorage, options)
        })
    }

    getProfile(): Promise<any> {
        if (this.platform.is('cordova')) {
            return this.storage.get(this.PROFILE_KEY)
        } else {
            return Promise.resolve(JSON.stringify({}))
        }
    }

    setProfile(data: any): void {
        this.saveData(data, this.PROFILE_KEY)
    }

    getLocation(): Promise<any> {
        return this.storage.get(this.LOCATION_KEY)
    }

    setLocation(data: any): void {
        this.saveData(data, this.LOCATION_KEY)
    }



    private saveData(data: any, key: string) {
        if (data) {
            let newData = JSON.stringify(data)
            this.storage.set(key, newData)
        } else {
            this.storage.remove(key)
        }
    }
}