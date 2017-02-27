import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {AngularFire} from "angularfire2";

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

  user:string;

  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
  }

  ngOnInit() {
    this.user = this._auth.email();
  }
}
