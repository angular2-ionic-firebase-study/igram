import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public items: FirebaseListObservable<any[]>;

  constructor(public af: AngularFire, private _auth: AuthService, public navCtrl: NavController) {
    this.items = af.database.list('/items');

    // Another format to upload a photo
    // var fileName = "sample.png";
    // this.storageRef = firebaseApp.storage().ref(`/items/${fileName}`);
  }

}
