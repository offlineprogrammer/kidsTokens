import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import { Component }                 from '@angular/core';
import { Alert,NavParams, ViewController, NavController } from 'ionic-angular';
import { DataService }               from '../../services/data';

@Component({
    templateUrl: 'build/pages/home/add-kid-modal.html'
})
export class AddKidModal {
    rootParams: any;
    form;

    

    constructor(private viewController: ViewController, 
    private dataService: DataService,
    private nav: NavController,
    navParams: NavParams) {

        this.form = new ControlGroup({
      firstName: new Control('', Validators.required),
      token: new Control('', Validators.required)
    });
       
    }

    close() {
        this.viewController.dismiss();
    }

      processForm() {
        let newkid: any;
        newkid = {
            name: this.form.value.firstName,
            token: this.form.value.token
        };
        this.dataService.addKid(newkid)
        .then(() => {

          let alert = Alert.create({
      title: 'New Kid',
      message: 'New Kid: ' + this.form.value.firstName + ' ' + this.form.value.token,
      buttons: [{
        text: 'Ok',
      }]
    });

    if (this.form.status === 'VALID') {
      this.nav.present(alert);
    }
           
          });

    
  }

  

        

}






