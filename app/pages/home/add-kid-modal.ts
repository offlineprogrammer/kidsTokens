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
    tokenType: string = 'Star';


    

    constructor(private viewController: ViewController, 
    private dataService: DataService,
    private nav: NavController,
    navParams: NavParams) {
       
        
        this.form = new ControlGroup({
      kidName: new Control('', Validators.required),      
      tokenNumbers: new Control('', Validators.required)
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

        let newkid: Child;
        newkid = {
            childId: this.generateUUID(),
            name: this.form.value.kidName,
            tokenType: this.tokenType,
            tokenNumbers: this.form.value.tokenNumbers,
            isActive: true
            
        };
        this.dataService.addKid(newkid)
        .then(() => {

    //       let alert = Alert.create({
    //   title: 'New Kid',
    //   message: 'New Kid: ' + this.form.value.firstName + ' ' + this.form.value.token,
    //   buttons: [{
    //     text: 'Ok',
    //   }]
    // });

    if (this.form.status === 'VALID') {
      // this.nav.present(alert).then(() => {
      //   this.close();
      //    });

         this.close();
      
    }
           
          });

    
  }

  

        

}






