import { Component } from '@angular/core';
import { Nav, NavController, NavParams , ToastController} from 'ionic-angular';
import { AboutPage } from '../../pages/about/about';

import { AuthService } from '../../providers/auth-service';
import { AngularFire, AuthProviders, AuthMethods } from 'angularfire2';

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  id : any;
  pw : any;

  constructor(public af: AngularFire, private _auth: AuthService, public navCtrl: NavController, public navParams: NavParams, nav: Nav, public toastCtrl: ToastController) {
    // this.af.auth.subscribe(auth => console.log(auth));
  }

  authLogin() {
    if (!this.id) {
      this.validateLoginToast("id 를 입력하세요");
    } else if (!this.pw) {
      this.validateLoginToast("pw 를 입력하세요");
    } else {
      this.af.auth.login({
          email: this.id,
          password: this.pw
        },
        {
          provider: AuthProviders.Password,
          method: AuthMethods.Password,
        }).then((success) => this.navigateAbout(success))
        .catch((err) => this.validateLoginToast("로그인 실패 - " + err.message));

      this.id = null;
      this.pw = null;
    }
  }

  signInWithFacebook(): void {
    this._auth.signInWithFacebook()
      .then((success) => this.navigateAbout(success))
      .catch((err) => alert(err));
  }

  signInWithGoogle() {
    this._auth.signInWithGoogle()
      .then((success) => this.navigateAbout(success))
      .catch((err) => alert(err));

    // this.af.auth.login({
    //   provider: AuthProviders.Google,
    //   method: AuthMethods.Popup
    // }).then((success) => this.navigateAbout(success));
  }

  private navigateAbout(successData): void {
    this.navParams = successData;

    this.navCtrl.push(AboutPage, {
      auth : successData
    });
    // this.navCtrl.parent.select(2);
  }

  validateLoginToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }
}
