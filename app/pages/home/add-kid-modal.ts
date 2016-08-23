import {
    Component
} from '@angular/core';
import {
    FormBuilder,
    FormGroup,
    Validators,
    FormControl
} from '@angular/forms';
import {
    Camera
} from 'ionic-native';
import {
    FORM_DIRECTIVES,
    REACTIVE_FORM_DIRECTIVES
} from '@angular/forms';
import {
    Alert,
    NavParams,
    ViewController,
    NavController,
    ModalController
} from 'ionic-angular';
import {
    DataService
} from '../../services/data';
import {
    Child
} from '../../models/child';
import {
  GAService
} from '../../services/googleAnalyticsService';
import {
    GAEvent
} from '../../models/gaEvent';

import {
  TokentypePage
} from '../tokentype/tokentype';





@Component({
    templateUrl: 'build/pages/home/add-kid-modal.html'
})
export class AddKidModal {
    rootParams: any;
    form;
    tokenType: string = 'images/star.png';
    tokenNumbers: number = 5;
    base64Image: string;




    constructor(private viewController: ViewController,
        private dataService: DataService,
        private gaService: GAService,
        private nav: NavController,
        private modalController: ModalController,
        navParams: NavParams) {


        this.form = new FormGroup({
            kidName: new FormControl('', Validators.required)
        });
        this.gaService.trackView('CreatKidModal');


    }

    selectToken() {
        let modal = this.modalController.create(TokentypePage, {selectedToken: this.tokenType});
    modal.onDidDismiss(data => {
     this.tokenType = data.selectedToken;
    });

    modal.present();
    }


    takePhoto() {
        Camera.getPicture({
            destinationType: Camera.DestinationType.DATA_URL,
            targetWidth: 1000,
            targetHeight: 1000
        }).then((imageData) => {
            // imageData is a base64 encoded string
            this.base64Image = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });
    }

    openGallery(): void {
        let cameraOptions = {
            sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
            destinationType: Camera.DestinationType.FILE_URI,
            quality: 100,
            targetWidth: 1000,
            targetHeight: 1000,
            encodingType: Camera.EncodingType.JPEG,
            correctOrientation: true
        };

        Camera.getPicture(cameraOptions)
            .then(file_uri => this.base64Image = file_uri,
                err => console.log(err));
    }



    private generateUUID(): any {
        var d = new Date().getTime();

        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
            var r = (d + Math.random() * 16) % 16 | 0;
            d = Math.floor(d / 16);
            return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
        });

        return uuid;
    }



    close() {
        this.viewController.dismiss();
    }



    processForm() {

        let newkid: Child;
        newkid = {
            childId: this.generateUUID(),
            name: this.form.value.kidName,
            tokenType: this.tokenType,
            tokenNumbers: this.tokenNumbers,
            srcTokenNumbers: 'images/' + this.tokenNumbers + '.png',
            isActive: true,
            childimage: this.base64Image,
            tasks: []

        };
        if (this.form.status === 'VALID') {
            this.dataService.addKid(newkid)
                .then(() => {
                    this.dataService.updateKids();
                    let oGAEvent: GAEvent;
                    oGAEvent = {
                        category: 'Child',
                        action: 'AddChild',
                        label: newkid.tokenType,
                        value: newkid.tokenNumbers,
                    };

                    this.gaService.trackEvent(oGAEvent);

                    this.close();



                });
        };


    }





}