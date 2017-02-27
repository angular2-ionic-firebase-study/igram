import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AngularFire} from "angularfire2";
import {AuthService} from "../../providers/auth-service";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  user:string;

  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
  }

  ngOnInit() {
    this.user = this._auth.email();
  }
}
