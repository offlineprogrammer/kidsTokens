import {
    Component
} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
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


@Component({
    templateUrl: 'build/pages/child/add-task-modal.html'
})
export class AddTaskModal {
    rootParams: any;
    form;
    
    constructor(private viewController: ViewController,
        private dataService: DataService,
        private nav: NavController,
        navParams: NavParams) {


        this.form = new FormGroup({
            taskName: new FormControl('', Validators.required)
        });


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
            childId: '',
            name: this.form.value.taskName

        };
         if (this.form.status === 'VALID') {
        this.dataService.addTask(newtask)
            .then(() => {
                    this.close();
            }); };


    }





}