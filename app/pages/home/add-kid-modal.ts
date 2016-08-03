import {FORM_DIRECTIVES, FormBuilder, Validators, Control, ControlGroup} from '@angular/common';
import { Component }                 from '@angular/core';
import { Alert, NavParams, ViewController, NavController } from 'ionic-angular';
import { DataService }               from '../../services/data';
import { Child }                       from '../../models/child';


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
      kidName: new Control('', Validators.required),
      tokenType: new Control('', Validators.required),
      tokenNumbers: new Control('', Validators.required)
    });
   
       
    }
    
    


    close() {
        this.viewController.dismiss();
    }

      processForm() {

        let newkid: Child;
        newkid = {
            childId: '1',
            name: this.form.value.kidName,
            tokenType: this.form.value.tokenType,
            tokenNumbers: this.form.value.tokenNumbers,
            isActive: true
            
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
      this.nav.present(alert).then(() => {
        this.close();
         });
      
    }
           
          });

    
  }

  

        

}






