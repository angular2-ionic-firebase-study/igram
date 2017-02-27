import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  authorizedData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private _auth: AuthService) {
    console.log(this.navParams.get('auth'));
    this.authorizedData = this.navParams.get('auth').auth;
  }

  signOut() {

  }
}
