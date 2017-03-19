import { Component } from '@angular/core';

import {ModalController} from 'ionic-angular';
import {AuthService} from "../../providers/auth-service";
import {BoardWritePage} from "./modal/board-write";

import {AngularFire, FirebaseListObservable} from "angularfire2";

@Component({
  selector: 'page-contact',
  templateUrl: 'board.html'
})
export class BoardPage {

  boards: FirebaseListObservable<any[]>;

  constructor(public modalCtrl: ModalController, public af: AngularFire, private _auth: AuthService) {
    this.boards = af.database.list('boards');
  }

  showWriteModal() {
    let writeModal = this.modalCtrl.create(BoardWritePage);
    writeModal.onDidDismiss(() => {});
    writeModal.present();
  }

}
