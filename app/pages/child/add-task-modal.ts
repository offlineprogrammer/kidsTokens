import {
    Component
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Camera} from 'ionic-native';
import {FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import {
    Alert,
    NavParams,
    ViewController,
    NavController
} from 'ionic-angular';
import {
    DataService
} from '../../services/data';
import {
    Task
} from '../../models/task';
import { Child }                       from '../../models/child';


@Component({
    templateUrl: 'build/pages/child/add-task-modal.html'
})
export class AddTaskModal {
    rootParams: any;
    form;
    childId: string;
    oChild: Child;
     base64Image: string;
    
    constructor(private viewController: ViewController,
        private dataService: DataService,
        private nav: NavController,
        navParams: NavParams) {
        this.oChild = navParams.get('child');
        this.form = new FormGroup({
            taskName: new FormControl('', Validators.required)
        });


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

 openGallery (): void {
  let cameraOptions = {
    sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
    destinationType: Camera.DestinationType.FILE_URI,      
    quality: 100,
    targetWidth: 1000,
    targetHeight: 1000,
    encodingType: Camera.EncodingType.JPEG,      
    correctOrientation: true
  }

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

        let newtask: Task;
        newtask = {
            taskId: this.generateUUID(),
            childId: this.oChild.childId,
            name: this.form.value.taskName,
            score: 0,
            taskimage: this.base64Image

        };
         if (this.form.status === 'VALID') {
             this.oChild.tasks.push(newtask);
        this.dataService.updateKids()
            .then(() => {
                    this.close();
            }); };


    }





}