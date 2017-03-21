import { Component, Inject } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

import { FirebaseApp, AngularFire, FirebaseListObservable } from 'angularfire2';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  public authorizedData: any;
  public storageRef: any;
  public image: string;

  public imgUrls: FirebaseListObservable<any[]>;

  constructor(@Inject(FirebaseApp) firebaseApp: any, public af: AngularFire, public navCtrl: NavController, public navParams: NavParams, private _auth: AuthService) {
    this.navCtrl = navCtrl;

    if (this.navParams.get('auth')) {
      this.authorizedData = this.navParams.get('auth').auth;
      // console.log(this.authorizedData);
    }

    this.storageRef = firebaseApp.storage().ref().child('/images/new_sample.png');
    this.storageRef.getDownloadURL().then(url => console.log(url));

    this.imgUrls = af.database.list('/imagesURLs');
  }

  signOut() {
    this._auth.signOut();
    this.navCtrl.pop();
  }

}
