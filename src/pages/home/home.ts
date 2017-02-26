import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire} from "angularfire2";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public af: AngularFire) {}

  google(){
    this.af.auth.login();
  }
  email(){

  }
  logout() {
    this.af.auth.logout();
  }
}
