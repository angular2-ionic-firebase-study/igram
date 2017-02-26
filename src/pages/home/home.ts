import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable} from "angularfire2";
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;

  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    this.items = af.database.list('/items');
  }

  google(){
    this.af.auth.login();
  }

  facebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    console.log("Facebook display name ",this._auth.displayName());
  }

  logout() {
    this.af.auth.logout();
  }
}
