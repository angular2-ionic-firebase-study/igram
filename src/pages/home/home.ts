import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFire, FirebaseListObservable, AuthMethods, AuthProviders} from "angularfire2";
import { AuthService } from '../../providers/auth-service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  items: FirebaseListObservable<any[]>;
  user:string;
  email:string;
  password:string;

  constructor(public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
  }

  ngOnInit() {
    this.user = this._auth.email();
  }

  signup() {
    const email = this.email;
    const password = this.password;
    this._auth.signup(email, password);
  }

  login() {
    const email = this.email;
    const password = this.password;

    this._auth.signInWithEmail(email, password).then(() => this.onSignInSuccess());
  }

  google(){
    this.af.auth.login({
      provider: AuthProviders.Google,
      method: AuthMethods.Popup
    }).then(() => this.onSignInSuccess());
  }

  facebook(): void {
    this._auth.signInWithFacebook()
      .then(() => this.onSignInSuccess());
  }

  private onSignInSuccess(): void {
    this.user = this._auth.email();
  }

  logout(): void {
    this._auth.signOut();
  }
}
