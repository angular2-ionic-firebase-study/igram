import { Component } from '@angular/core';

import {ModalController, NavController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {LoginPage} from "../login/login";
import {BoardWritePage} from "./modal/board-write";

import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-contact',
  templateUrl: 'board.html'
})
export class BoardPage {

  boards: FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, public navCtrl: NavController, public af: AngularFire, private _auth: AuthService) {
    this.boards = af.database.list('boards');
  }

  ionViewWillEnter() {
    if(!this._auth.authenticated) {
      alert('로그인해야만 이용할 수 있습니다');
      this.navCtrl.push(LoginPage);
    }
  }

  showWriteModal() {
    let writeModal = this.modalCtrl.create(BoardWritePage);
    writeModal.onDidDismiss(() => {});
    writeModal.present();
  }

}
